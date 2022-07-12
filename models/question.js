const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    
    q: 
    {
        type: String,
        required: true
    },

    options: [ { type:String, required: true } ],

    answer:
    {
        type: String,
        required: true
    },
    qzName:
    {
        type:String,
        required:true
    },
    quizTiming:
    {
        type:String,
        required:true
    }

},{ timestamps: true});


module.exports = QuestionSchema;
