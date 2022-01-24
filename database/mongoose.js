var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017/NodeTest';
var database = mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = database.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db; 