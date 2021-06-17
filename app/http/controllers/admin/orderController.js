const mysql = require('mysql');
const db = require('../../../config/connection')



exports.index = (req, res) => {
    db.query('select * from orders left join users on orders.customer_id=users.id WHERE orders.status != "completed" ', (err, orders) => {
     // console.log(orders)
     
          if(req.xhr){
          
         return res.json(orders)
    } else {
       // console.log(err) 
        return res.render('admin/orders')
    }
      
     
    })
}
