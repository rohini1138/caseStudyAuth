const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./models/users");
//const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var crypto = require('crypto');
var key = 'password';
var algo = 'aes256';

mongoose.connect("mongodb+srv://rohini_atlas:RSKNC9nlk2iTu4Ex@mydb.ejhaw.mongodb.net/UserDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log("Error connecting");
    } else {
        console.log("Connection successs");
    }
});

app.post("/register", jsonParser, function(req, res) {
    var cipher = crypto.createCipher(algo, key);
    var encrypted = cipher.update(req.body.password, 'utf8', 'hex') +
        cipher.final('hex');
    console.log(req.body.encrypted);

    const data = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: encrypted
    });
    data.save().then((result) => {
        res.json(result);
    }).catch((err) => console.log(err))
    res.end("register called");
});

// app.post("/users/login", async(req, res) => {
//     const user = users.find(user => user.name = req.body.name)
//     if (user == null) {
//         return res.status(400).send("can't find user")
//     }
//     try {
//         if (await crypto.verify(req.body.password, user.password)) {
//             res.send('success')
//         } else {
//             res.send("not allowed")
//         }
//     } catch {
//         res.status(500).send()
//     }
// });

// router.post("/register", jsonParser, function(req, res) {
//     console.log(req.body);
//     res.end("register called");
// })

app.get("/", function(req, res) {
    res.end("Hey welcome to my application!!");
})

app.listen(5000);