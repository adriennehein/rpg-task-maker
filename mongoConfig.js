const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/taskMaker', { 
    useCreateIndex: true,
    useNewUrlParser: true
});

module.exports = {
    mongoose
}