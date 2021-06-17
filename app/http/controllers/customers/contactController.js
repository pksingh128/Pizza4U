const mysql = require('mysql');
const db = require('../../../config/connection')
const date = require('date-and-time');
const nodemailer = require('nodemailer');


exports.contact = (req,res)=>{
    res.render('customers/contact')

}
exports.postContact = (req,res) =>{
    // console.log(req.body)
     const {name, email, phone, message} =req.body;
     if (!name || !email ||!phone || ! message) {
        req.flash('msg', 'All fields are required')
     
        return res.redirect('/contact')
   }


     db.query('INSERT INTO contacts SET name=?,email=?,phone=?,message=?,created_at=?', [name, email, phone, message, date.format(new Date(), 'ddd,MMM DD YYYY hh:mm A')], (err, rows) => {
         if(!err) {
           // res.render('customers/contact', {msg:'succseefully collected data'});
    const output = `
    <p>You have a new contact request </p>
    <h1>Contact details </h1>
     <ul>
     <li>Name: ${req.body.name} </li>
    
     <li>Email: ${req.body.email} </li>
     <li>Phone Number: ${req.body.phone} </li>
     <li>Message: ${req.body.message} </li>
     </ul>
    `;
 
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,

        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },

    });
 
   // setup email data with unicode symbols
   let mailOptions = {
       from: `"Pizza corner" <${process.env.EMAIL}>`, // sender address
       to: req.body.email, // list of receivers
       subject: 'contacts', // Subject line
       text: 'Hello world?', // plain text body
       html: output // html body
   };
 
   // send mail with defined transport object
   transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           return console.log(error);
           //res.render('customers/contact', {msg:'some thing went wrong'});
       }
     
       console.log('Message sent: %s', info.messageId);   
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
     //  res.render('customers/contact', {msg:'Email has been sent'});
      req.flash('msg', 'Email has been sent')
       return res.redirect('/contact')
   });
         }else{
             console.log(err)
         }
   
 
     })
 }
