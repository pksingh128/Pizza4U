
const mysql = require('mysql');
const db = require('../../../app/config/connection')
const bcrypt = require('bcrypt');
const passport = require('passport')
 
//get redirect after login
const _getRedirectUrl = (req) =>{
     return req.user[0].role === 'admin' ? '/admin/orders': '/customer/orders'
}

exports.login = (req, res) => {
     res.render('auth/login')
}
exports.register = (req, res) => {
     res.render('auth/register')
}
exports.postRegister = (req, res) => {
     const { name, email, password, passwordConfirm } = req.body;  //data coming from form
     //console.log(req.body)
     //validate request
     if (!name || !email || !password || !passwordConfirm) {
          req.flash('error', 'All fields are required')
          req.flash('name', name)
          req.flash('email', email)
          return res.redirect('/register')
     }

     //check if email already exist
     db.query('SELECT email from users WHERE email=?', [email], async (err, results) => {
          if (results.length > 0) {
               req.flash('error', 'Email already taken')
               req.flash('name', name)
               req.flash('email', email)
               return res.redirect('/register')
          }
          else if (password !== passwordConfirm) {
               req.flash('error', 'Password do not match')
               req.flash('name', name)
               req.flash('email', email)
               return res.redirect('/register')
          }
          //Hash passowrd
          let hashedPassword = await bcrypt.hash(password, 8);
          console.log(hashedPassword);
          db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
               if (err) {
                    console.log(err);
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/register')
               } else {
                    //login
                    console.log(results)
                    req.flash('error', 'Sucessfully registered')
                    return res.redirect('/')

               }
          })


     })
     console.log(req.body)
}

exports.postLogin = (req, res, next) => {
     const { name, email, password, passwordConfirm } = req.body;  //data coming from form
     //validate request
     if (!email || !password ) {
          req.flash('error', 'All fields are required')
          
          return res.redirect('/login')
     }
     passport.authenticate('local', (err, user, info) => {    
          if (err) {
               req.flash('error', info.message)
               return next(err)
          }
          if (!user) {
               req.flash('error', info.message)
               return res.redirect('/login')
          }
          req.login(user, (err) => {
               if (err) {
                    req.flash('error', info.message)
                    return next(err)
               }
               return res.redirect(_getRedirectUrl(req)) //resticted page
          })
     }) (req,res,next)
}


//logout
exports.logout =(req,res) =>{
     req.logout()
     return res.redirect('/login')
}