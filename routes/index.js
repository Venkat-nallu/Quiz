const express = require('express');

const User = require('../models/user');

const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');



router.get('/', homeController.home);

router.get('/quiz',function(req,res)
{

    if ( req.isAuthenticated() )
    {
        return res.render('quiz', {
            title: "E-Quiz"
        });      
    }


    return res.redirect('/');
});

router.get('/admin-view',function(req,res){

    console.log("\nhai......................");
    console.log("\nUser details = " ,req.user);

    if(req.user.email == 'vijayvenkatesh503@gmail.com') return res.redirect('/admin');

    else 
    {
        console.log('\n\nyou are not a admin\n\n')

        req.flash('error','You are not an admin !!!'); 
        res.redirect('back');
    }
});




router.use('/users', require('./users'));


module.exports = router;