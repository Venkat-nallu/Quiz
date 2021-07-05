// const mongoose1 = require('mongoose');

// const quesSchema = new mongoose1.Schema({
    
//     q: 
//     {
//         type: String,
//         required: true
//     },

//     options: [ { type:String, required: true } ],

//     answer:
//     {
//         type: String,
//         required: true
//     },
//     qzName:
//     {
//         type:String,
//         required:true
//     }

// },{ timestamps: true});



// const QuestionSchema = mongoose1.model('QuestionSchema', quesSchema);

// module.exports = QuestionSchema;



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
