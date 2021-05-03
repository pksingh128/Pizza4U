require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
var helpers = require('handlebars-helpers')();
const session = require('express-session');
const flash = require('express-flash')
//const flush = require('connect-flash')
const cookieParser = require('cookie-parser');
const MYSQLStore = require('express-mysql-session')(session);

//use express
const app = express();

//database connection
const db = mysql.createConnection({
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_pass,
    database        : process.env.DB_NAME 
});
db.connect ((err)=>{
    if(err)
    console.log(err);
    else{
        console.log("Database connected");
        }
})

//session store
let sessionStore= new MYSQLStore({},db);
//session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24} //24hrs
}))
// flash messaging...
app.use(cookieParser('keyboard cat'));
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }}
));

app.use(flash())

//port 
const port= process.env.PORT || 5000;

// //standard middleware for parsing json request
 app.use(express.json());

// //form data parsing
// app.use(express.urlencoded({extended:false}));

//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

//provide static files
app.use(express.static('public'));

//Templating Engine 
app.engine('hbs',exphbs({ extname: '.hbs'}));
app.set('view engine','hbs');

//require and call web routes
require('./routes/web')(app)


//listening to port
app.listen(port,()=>{
    console.log(`server up and running on the port ${port}`);
})
