const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

    qn: 
    {
        type: String,
        required: true
    },

    options: [ { type:String, required: true } ],

    answer:
    {
        type: String,
        required: true
    }


}, {
    timestamps: true
});


const QuestionSchema = mongoose.model('QuestionSchema', questionSchema);

module.exports = QuestionSchema;