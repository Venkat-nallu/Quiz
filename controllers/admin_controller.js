module.exports.admin = function(req, res){
   
    console.log("\nhai......................");
    console.log("User details = " ,req.user);

    // if (req.user.email === 'vijayvenkatesh503@gmail.com')
    // {
    //     return res.send('/');
    // }

    // else 
    // {
    //     return res.redirect('/');
    // }


    return res.redirect('/admin');

});

// module.exports.actionName = function(req, res){}
