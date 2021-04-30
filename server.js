require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

//port 
const port= process.env.PORT || 5000;

//provide static files
app.use(express.static('public'));

//Templating Engine 
app.engine('hbs',exphbs({ extname: '.hbs'}));
app.set('view engine','hbs');



app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart')
})
//listening to port
app.listen(port,()=>{
    console.log(`server up and running on the port ${port}`);
})
