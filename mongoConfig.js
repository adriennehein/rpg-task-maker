const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/taskMaker', {useNewUrlParser: true});

module.exports = {
    mongoose
}