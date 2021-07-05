// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/E-Quiz');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "\n\nError connecting to MongoDB\n\n"));


// db.once('open', function(){
//     console.log('\nConnected to Database :: MongoDB\n');
// });


// module.exports = db;


// const mongoose = require('mongoose')

// const url = `mongodb+srv://VKS_CONTACT_LIST:vkscontactlist@cluster0.l0cj6.mongodb.net/E-Quiz?retryWrites=true&w=majority`;

// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
// mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('\n\nConnected to mongodb atlas(E-Quiz) database ')
//     })
//     .catch( (err) => {
//         console.error(`\n\nError connecting to mongodb atlas(E-Quiz) database. \n${err}`);
//     })

// const db = mongoose.connection;

// module.exports = db;

const mongoose = require('mongoose');

const conn = mongoose.createConnection(`mongodb+srv://VKS_CONTACT_LIST:vkscontactlist@cluster0.l0cj6.mongodb.net/E-Quiz?retryWrites=true&w=majority`);

var User = conn.model('User',require('../models/user'));

module.exports = User;

