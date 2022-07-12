const mongoose = require('mongoose');

const conn = mongoose.createConnection(`mongodb+srv://VKS_CONTACT_LIST:vkscontactlist@cluster0.l0cj6.mongodb.net/E-Quiz?retryWrites=true&w=majority`);

var User = conn.model('User',require('../models/user'));

module.exports = User;
