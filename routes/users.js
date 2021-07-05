const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const User = require('../config/mongoose');
const QuestionSchema = require('../config/mongoose1');



// router.get('/profile', passport.checkAuthentication,usersController.profile);

// router.get('/sign-up', usersController.signUp);
// router.get('/sign-in', usersController.signIn);
router.get('/sign-out', usersController.destroySession);


router.get('/profile', passport.checkAuthentication, function(req, res) {
   
    User.find({email:req.user.email}, function(err, data) {
        
        res.render('user_dashboard', {
            'title': "Dashboard",
            'userDetails': data
        });
    }).lean();
});



// router.post('/create', usersController.create);


// // use passport as a middleware to authenticate
// router.post('/create-session', passport.authenticate(
//     'local',
//     {failureRedirect: '/users/sign-in'},
// ), usersController.createSession);


//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), usersController.createSession);


router.get('/auth/google',passport.authenticate(
    'google',
    { scope: ['profile','email'] })
);


// router.get('/auth/google/callback',passport.authenticate( 
//     'google', 
//     { failureRedirect: '/users/sign-in'}
// ),usersController.createSession );

router.get('/auth/google/callback',passport.authenticate( 
    'google', 
    { failureRedirect: '/'}
),usersController.createSession );


module.exports = router;