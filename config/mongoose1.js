const mongoose1 = require('mongoose');

mongoose1.connect('mongodb://localhost/E-Quiz-Qn');

const DB = mongoose.connection;

DB.on('error', console.error.bind(console, "\n\nError connecting to MongoDB(inside mongoose1) file\n\n"));


DB.once('open', function(){
    console.log('\nConnected to Database(inside mongoose1) :: MongoDB\n');
});

module.exports = DB;