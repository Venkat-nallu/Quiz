const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    password: 
    {
        type: String,
        required: true
    },
    name: 
    {
        type: String,
        required: true
    },
    
    loginHistory: [ { type:Date } ],

}, {
    timestamps: true
});


// const User = mongoose.model('User', userSchema);

// module.exports = User;

module.exports = User;
