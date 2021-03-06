require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
var helpers = require('handlebars-helpers')();
const session = require('express-session');
const flash = require('express-flash')
const passport = require('passport')
const path = require('path')
const cookieParser = require('cookie-parser');
const MYSQLStore = require('express-mysql-session')(session);
const Emitter = require('events')

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

//event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter',eventEmitter)


//session store
let sessionStore= new MYSQLStore({},db);
//session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*2 } //24hrs1000*60*60*24
}))


//passport config
const passportInit = require('./app/pConfig/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash());

//port 
const port= process.env.PORT || 5000;

// //standard middleware for parsing json request
 app.use(express.json());

// //form data parsing
 app.use(express.urlencoded({extended:false}));

//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    res.locals.msg = req.flash('msg')
    next()
})

//provide static files
const publicdirectory = path.join(__dirname,'./public');
app.use(express.static(publicdirectory));




//Templating Engine 
app.engine('hbs',exphbs({ defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine','hbs');

//require and call web routes
require('./routes/web')(app)
// const routes = require('./routes/web');

// app.use('/',routes);

//error 404
app.get('*',(req,res)=>{
    res.render("404error",{
      errorMsg:'Opps! Page Not Found'
    })
  })

//listening to port
const server = app.listen(port,()=>{
    console.log(`server up and running on the port ${port}`);
})


//socket
const io = require('socket.io')(server)
io.on('connection',(socket)=>{
    //join
      //console.log(socket.id)
      socket.on('join',(orderId)=>{
          //console.log(orderId)
         socket.join(orderId)
      })
})
//listen emit which is emitted by statuscontroller
 eventEmitter.on('orderUpdated',(data)=>{
     io.to(`order_${data.id}`).emit('orderUpdated',data)
 })


  
 