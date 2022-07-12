const express = require('express');     // adding express library from nodejs

var bodyParser = require('body-parser');

// ---------adminbro-----------------1
const AdminBro = require('admin-bro');
const mongooseAdminBro = require('@admin-bro/mongoose');
const expressAdminBro = require('@admin-bro/express');
//-----------------------------------1

const cookieParser = require('cookie-parser');
const port = 8200;

const path = require('path');           //to join path of ejs files to current file

const app = express();

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongodb-session')(session);

const flash = require('connect-flash');
const customMware = require('./config/middleware');


//----------------Admin Bro and Models --------- 2

// const Visiter = require('./models/user');

const Visiter = require('./config/mongoose');

AdminBro.registerAdapter(mongooseAdminBro)

const AdminBroOptions = {
    rootPath : '/vks001',
    // logoutPath: '/xyz-admin/exit',
    // loginPath: '/xyz-admin/sign-in',
    resources: [Visiter]
}

// --------------------------------------------- 2


app.use(express.urlencoded());

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());



app.use(cookieParser());

app.use(express.static('assets'));


app.set('view engine', 'ejs');          //setting up template engine
// app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({

    name: 'E-Quiz',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)  // 1,00,000 * 60 = 60,00,00 ms => 6000 sec => 100 min
    },

    store: new MongoStore(
        {
            uri: `mongodb+srv://VKS_CONTACT_LIST:vkscontactlist@cluster0.l0cj6.mongodb.net/E-Quiz?retryWrites=true&w=majority`,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  '\nconnect-mongodb-session setup ok\n');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// flash should be placed after session
app.use(flash());
app.use(customMware.setFlash);


//--------------adminbro -----------------  3

const adminBro = new AdminBro(AdminBroOptions)
const router = expressAdminBro.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)

// ---------------------------------------- 3


// use express router(should be placed at end)

app.use('/', require('./routes'));

app.listen(process.env.PORT || port, function (err) {
    if (err) {
        console.log("Error in running express server ...... ", err);
    }
    console.log("\nYeah!!! Express server for E-Quiz is running in  ............  ", port);
})
