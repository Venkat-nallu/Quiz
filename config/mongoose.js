const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/E-Quiz');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "\nError connecting to MongoDB\n"));


db.once('open', function(){
    console.log('\nConnected to Database :: MongoDB\n');
});


module.exports = db;