const express = require('express');

const router = express.Router();
// const homeController = require('../controllers/home_controller');
const homeController = require('../controllers/home_controller');
// const adminController = require('../controllers/admin_controller');


router.get('/', homeController.home);

router.get('/quiz',function(req,res)
{
    return res.render('quiz', {
        title: "E-Quiz"
    });
});

router.get('/admin-view',function(req,res){

    console.log("\nhai......................");
    console.log("\nUser details = " ,req.user);

    if(req.user.email == 'vijayvenkatesh503@gmail.com') return res.redirect('/admin');

    else 
    {
        console.log('\n\nyou are not a admin\n\n')
        req.locals.flag = 1;
        // res.redirect('users/profile');
        // res.render('user_profile', { title : "Profile",flag=0 });

        res.render('user_profile',{ title : "Profile"});
    }
});

// router.get('/admin-view',adminController.admin);

router.use('/users', require('./users'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports = router;