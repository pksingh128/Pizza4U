const mysql = require('mysql');
const db = require('../../../config/connection')



exports.index = (req, res) => {
    db.query('select * from orders join users on orders.customer_id=users.id WHERE orders.status != "completed" ', (err, orders) => {
    
           
      ///  var orders=JSON.parse(rows)
      console.log(orders)
     
          if(req.xhr){
          
         return res.json(orders)
    } else {
       // console.log(err) 
        return res.render('admin/orders')
    }
      
     
    })
}