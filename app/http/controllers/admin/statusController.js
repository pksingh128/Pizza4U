const mysql = require('mysql');
const db = require('../../../config/connection')


exports.update = (req,res)=>{
    db.query('UPDATE orders SET status = ? WHERE order_id = ?',[req.body.status ,req.body.orderId],(err,data)=>{
      if(err){
        return res.redirect('/admin/orders')
        console.log(data)
      }

      console.log(data)
      return res.redirect('/admin/orders')

    })

}