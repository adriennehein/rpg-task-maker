// Utilities
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const SECRET = REACT_APP_SECRET;

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
app.use(bodyParser.json());
app.use(cookieParser);
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

app.post('/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne(({ email }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500)
        .json({
          error: "Internal error, please try again"
        })
    } else if (!user) {
      res.status(401)
        .json({
          error: "Incorrect email or password"
        })
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: "Internal error, please try again"
            })
        } else if (!same) {
          res.status(401)
            .json({
              error: "Incorrect email or password"
            })
        } else {
          const payload = { email };
          const token = jwt.sign(payload, SECRET, {
            expiresIn: '1hr'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200)
        }
      });
    }
  }))
})

// Serve React
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log("Task maker running!")} );