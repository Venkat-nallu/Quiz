const express = require('express');     // adding express library from nodejs
const port = process.env.PORT || 8200;

const path = require('path');           //to join path of ejs files to current file

const app = express();

app.set('view engine', 'ejs');          //setting up template engine
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

// app.get('/', function (req, res) {

//     return res.render('practice', {
//         title: "Practice page"
//     });
// })

app.get('/', function (req, res) {

    return res.render('home', {
        title: "E-Quiz"
    });
})

// var quizQuestion = require('./assets/js/quiz-question');
// var quizSite = require('./assets/js/quiz-site');

// app.get('/review', function (req, res) {

//     return res.render('quizReview', {
//         title: "Review Page"       
//     });
// })

app.listen(port, function (err) {
    if (err) {
        console.log("Error in running express server ", err);
    }
    console.log("\nYeah!!! Express server for E-Quiz is running in port ", port);
})