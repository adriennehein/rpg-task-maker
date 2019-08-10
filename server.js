const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/swish', function (req, res) {
    return res.send('and flick');
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080, () => { console.log("Task maker running!")} );