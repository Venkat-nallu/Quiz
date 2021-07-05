// const mongoose1 = require('mongoose');

// mongoose1.connect('mongodb://localhost/E-Quiz-Qn');

// const DB = mongoose1.connection;

// DB.on('error', console.error.bind(console, "\n\nError connecting to MongoDB(inside mongoose1) file\n\n"));


// DB.once('open', function(){
//     console.log('\nConnected to Database(inside mongoose1) :: MongoDB\n');
// });


// module.exports = DB;



// const mongoose = require('mongoose')

// const url = `mongodb+srv://VKS_CONTACT_LIST:vkscontactlist@cluster0.obsb2.mongodb.net/E-Quiz-Qn?retryWrites=true&w=majority`;

// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
// mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('Connected to mongodb atlas(E-Quiz-Qn) database ')
//     })
//     .catch( (err) => {
       
//         console.error(`\n\nError connecting to mongodb atlas(E-Quiz-Qn) database. \n${err}`);
//     })

// const DB = mongoose.connection;

// module.exports = DB;


const mongoose = require('mongoose');

// const conn = mongoose.createConnection(`mongodb+srv://VKS_CONTACT_LIST:vkscontactlist@cluster0.l0cj6.mongodb.net/E-Quiz?retryWrites=true&w=majority`);

const conn1 = mongoose.createConnection(`mongodb+srv://VKS_CONTACT_LIST:vkscontactlist@cluster0.obsb2.mongodb.net/E-Quiz-Qn?retryWrites=true&w=majority`);

// var User = conn.model('User',require('../models/user'));

var QuestionSchema =  conn1.model('QuestionSchema',require('../models/question'));


// QuestionSchema.find({}, function(err,userdetails) {

//     if(err)
//         console.error(`\n\nError in aceessing from user schema inside mongoose1.js file \n${err}`);
    
//     else console.log("User details inside mongoose1.js file = ",userdetails);
        
//  });

// const Arr = [
//     {
//         q: 'What is the range of character data type in C language ?',
//         options: ['-128 to 255', '-127 to 128', '-128 to 127', '0 to 128'],
//         answer: 2,
//         qzName: 'General quiz'
//     },

//     {
//         q: 'What is the range of int data type in C language ?',
//         options: ['-32768 to 32767', '-32767 to 32769', '-32780 to 32790', '0 to 65438'],
//         answer: 0,
//         qzName: 'General quiz'

//     }
// ];

// QuestionSchema.insertMany(Arr, function (err, temp) {

//     if (err) {
//         console.log(err);
//         // terminate request/response cycle
//         return res.send('Error saving');
//     }

//     else console.log('\n\nSuccessfully added the arr of obj into db\n\n');

// });



//     QuestionSchema.find({qzName:'General quiz'}).exec(function(err,allUser)
//     {
//         if(err)
//         {
//             console.log(err);
//         } 
//         else
//         {
//             console.log('\n\n\nAll retrived user detail is ',allUser);
//         }
//     });


module.exports = QuestionSchema;
