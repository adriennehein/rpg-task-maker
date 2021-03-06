// Config Vars
require('dotenv').config()

// Dependencies
const express = require('express');
const mongo = require('./mongoConfig')
const mongoose = mongo.mongoose
const path = require('path');


// Utilities
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const withAuth = require('./auth');
const SECRET = process.env.REACT_APP_SECRET;


// Mongo Setup
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected!")
});

// Model Setup
const User = require('./models/User.js')
const Task = require('./models/Task.js')

// Express Instance Setup
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

// API
app.get('/swish', withAuth, function (req, res) {
    res.json('and flick');
})

app.post('/register', function (req, res) {

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

app.get('/tasks', function(req, res) {
  // console.log(req)
  const tasks = Task.find({}, (err, docs) => {
    if (err) {
      res.json(err)
    } else {
      res.json(docs)
    }
  });
})

app.post('/task', function(req, res) {

  const { taskTitle, taskDescription, taskCompleted } = req.body;

  const task = new Task({taskTitle, taskDescription, taskCompleted});
  task.save(function(err) {
    if (err) {
      res.status(500).json("Error. Task not saved.");
    } else {
      res.status(200).json("Task saved successfully.");
    }
  })
})

app.post('/authenticate', function(req, res) {
  const { email, password } = req.body;

  User.findOne({ email: email }, function(err, user) {
    console.log(user);

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
  })
})

// Serve React
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log("Task maker running!")} );
