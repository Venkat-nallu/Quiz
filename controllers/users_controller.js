const User = require('../config/mongoose');


module.exports.profile = function(req, res){

    return res.render('user_dashboard', { title: "Dashboard"});  //-------------
}


// // render the sign up page
// module.exports.signUp = function(req, res){

//     if (req.isAuthenticated())
//     {
//         return res.redirect('/users/profile');    //---------------
//     }

//     return res.redirect("/users/auth/google");
// }

// render the sign in page
// module.exports.signIn = function(req, res){

//     if (req.isAuthenticated())
//     {
//         return res.redirect('/users/profile');    //----------------
//     }

//     return res.redirect("/users/auth/google");
// }

// get the sign up data
// module.exports.create = function(req, res){

//     if (req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){

//         if(err){ console.log('error in finding user in signing up'); return }

//         if (!user)  //if user is not signed-up then store user's details in db
//         {
//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.redirect('/users/sign-in');
//             })
//         }
//         else    //if user is already signedup then redirect to sign-in page
//         {
//             return res.redirect('/users/sign-in');            
//         }
//     });
// }


// // sign in and create a session for the user (by manual - authentication)
// module.exports.createSession = function(req, res){

//     // steps to authenticate
//     // find the user
//     User.findOne({email: req.body.email}, function(err, user){

//         if(err){ console.log('error in finding user in signing in'); return }

//         // handle user found
//         if (user)
//         {

//             // handle password which doesn't match
//             if (user.password != req.body.password)
//             {
//                 return res.redirect('back');
//             }

//             // handle session creation
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');

//         }
//         else
//         {
//             // handle user not found
//             return res.redirect('back');
//         }

//     });

// }


// sign in and create a session for the user(by passport.js authentication)
module.exports.createSession = function(req, res)
{
    req.flash('success','Logged in Successfully');

    // updating the updatedAt value once user login again after registration
    User.findOneAndUpdate({email: req.user.email}, {updatedAt: Date.now()}, (err, user) => {

        if(err) { console.log(err); return;}

        else { console.log("\n\n\nSuccessfully updated the updatedAt value......", user);return; }
    
      });   
      
      
      // Filling the loginHistory Array each time if user signed in 
    User.findOneAndUpdate({email: req.user.email}, { $push: { loginHistory: Date.now()} }, (err, user) => {

        if(err) { console.log(err); return;}

        else { console.log("\n\n\nSuccessfully updated the loginHistory......", user);return; }
    
      });   

    return res.redirect('/users/profile');  //---------------------
}

// sign-out
module.exports.destroySession = function(req, res)
{    
    req.flash('success','Logged out Successfully');
    req.logout();

    return res.redirect('/');
}
