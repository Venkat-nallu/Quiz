/*

const mongoose1 = require('mongoose');

mongoose1.connect('mongodb://localhost/E-Quiz-Qn');

const DB = mongoose1.connection;

DB.on('error', console.error.bind(console, "\n\nError connecting to MongoDB(inside mongoose1) file\n\n"));


DB.once('open', function(){
    console.log('\nConnected to Database(inside mongoose1) :: MongoDB\n');
});


module.exports = DB; 

*/


const mongoose = require('mongoose');


const conn1 = mongoose.createConnection(`mongodb+srv://VKS_CONTACT_LIST:vkscontactlist@cluster0.obsb2.mongodb.net/E-Quiz-Qn?retryWrites=true&w=majority`);

var QuestionSchema =  conn1.model('QuestionSchema',require('../models/question'));

module.exports = QuestionSchema;
