const express = require('express');     // adding express library from nodejs
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8200;
const db = require('./config/mongoose');
const path = require('path');           //to join path of ejs files to current file

const app = express();

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongodb-session')(session);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('assets'));


app.set('view engine', 'ejs');          //setting up template engine
// app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({

    name: 'E-Quiz',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },

    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use express router(should be placed at end)
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log("Error in running express server ", err);
    }
    console.log("\nYeah!!! Express server for E-Quiz is running in port ", port);
})