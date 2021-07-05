const express = require('express');

const User = require('../config/mongoose');
const QuestionSchema = require('../config/mongoose1');


const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');
const adminController = require('../controllers/admin_controller');


router.get('/', homeController.home);

// axios from admin.js for adding quiz final array of object after created by admin
router.post('/request',adminController.qns);

// axios for receiving the user clicked quiz from list of available quiz in available_quiz.ejs file
router.post('/quiz-action', adminController.returningQuizFromDb);

// axios for receiving the user clicked quiz from list of available quiz in delete_quiz.ejs file to delete that quiz
router.post('/quiz-action-delete', adminController.deletingQuizFromDb);

router.get('/quiz',adminController.quizPage);

// router.get('/quiz',function(req,res)
// {

//     // if ( req.isAuthenticated() ) //------------------
//     // {

//         return res.render('quiz', {
//             title: "E-Quiz"
//         });     

//     // }

// //     // return res.redirect('/');    // -------------------

// });

router.get('/vks001',function(req,res){

    console.log('\n\n\ninside admin router....');

    if (req.isAuthenticated())
    {
        if (req.user.email == 'vijayvenkatesh503@gmail.com')
        {
            return res.redirect('/vks001');
        }

        else return res.redirect('back');
    }
});

router.get('/admin-view',function(req,res){

    console.log("\nhai......................");
    console.log("\nUser details = " ,req.user);

    if (req.isAuthenticated() && req.user.email == 'vijayvenkatesh503@gmail.com')
    {
        return res.redirect('/vks001');    //---------------
    }

    // if(req.user.email == 'vijayvenkatesh503@gmail.com') return res.redirect('/vks001');

    else 
    {
        console.log('\n\nyou are not a admin\n\n')

        req.flash('error','You are not an admin !!!'); 
        res.redirect('back');
    }
});

// available quiz page

router.get('/available-quiz', (req,res)=>{

    QuestionSchema.find().distinct( 'qzName', function(err, data) {
        
        // console.log('\n\n\n Inside availabe quiz router -- all unique quiz  ',data)

        res.render('available_quiz', {
            'title': "Available Quiz",
            'allQuiz': data
        });

    }).lean();

})

//to dsiplay available quiz in delete quiz page
router.get('/delete-quiz', (req,res)=>{

    QuestionSchema.find().distinct( 'qzName', function(err, data) {
        
        // console.log('\n\n\n Inside availabe quiz router -- all unique quiz  ',data)

        res.render('delete_quiz', {
            'title': "Delete Quiz",
            'allQuiz': data
        });

    }).lean();

})


// Allow admin to set question and ans via form
router.get('/admin',function(req,res){

    // if (req.isAuthenticated() && req.user.email == 'vijayvenkatesh503@gmail.com')
    // {
        return res.render('admin', {
            title: "Admin Page"
        });  
    // }

    // else 
    // {
    //     console.log('\n\nyou are not a admin\n\n')

    //     req.flash('error','You are not an admin !!!'); 
    //     res.redirect('back');
    // }

});


router.use('/users', require('./users'));

module.exports = router;