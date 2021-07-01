const express = require('express');

const User = require('../models/user');

const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);

router.post('/request',function(req,res){

    console.log(req.body);
    return;

});

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


// Allow admin to set question and ans via form
router.get('/admin',function(req,res){

    return res.render('admin', {
        title: "Admin Page"
    });  

});


router.use('/users', require('./users'));

module.exports = router;