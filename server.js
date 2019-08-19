// Utilities
const bodyParser = require('body-parser');
const path = require('path');

// Dependencies
const express = require('express');
const mongo = require('./mongoConfig')
const mongoose = mongo.mongoose

// Mongo Setup
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected!")
});

// Model Setup
const User = require('./models/User.js')

// Express Instance Setup
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// API
app.get('/swish', function (req, res) {
    return res.json('and flick');
})

app.post('/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({email, password});
  user.save(function(err){
    if (err) {
      res.status(500).json("Error: Please try again.");
    } else {
      res.status(200).json('Sign up successful. Welcome!');
    }
  });
})

// Serve React
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log("Task maker running!")} );