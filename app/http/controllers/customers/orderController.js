const mysql = require('mysql');
const db = require('../../../config/connection')
//const passport = require('passport')
const moment = require('moment')



exports.store = (req,res) =>{
   // console.log(req.body)
    //validate request
    
    const{phone, address} =req.body
    if(!phone || !address){
        req.flash('error','All fields are required')
        return res.redirect('/')
        
    }  
     
           const customer_id= req.user[0].id;
         const items = JSON.stringify(req.session.cart.items);
         // console.log(`customer_Id = ${items}`)

        
     
           
    
    db.query('INSERT INTO orders SET items=?,phone=?,address=?,customer_id=?', [items,phone, address,customer_id], (err, rows) => {
         console.log(rows)
             if(!err){
           req.flash('success','Order placed succsessfully..')
        return res.redirect('/')
      } else{
          console.log(err)
          req.flash('error','Something went wrong')
          return res.redirect('/cart')
        }
     })
}


exports.index = async(req,res) =>{
    try{
     const orders=await db.query('SELECT * FROM orders WHERE customer_id=?', [req.user[0].id], (err, orders) => {
        if(!err){
            res.render('customers/orders',{orders,moment:moment})
        console.log(orders)
        }else{
            console.log(err)
        }
    })
} catch(err){
    console.log(err)
}
}