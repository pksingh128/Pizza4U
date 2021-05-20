const mysql = require('mysql');
const db = require('../../../config/connection')
const date = require('date-and-time');


exports.update = (req,res)=>{
    db.query('UPDATE orders SET status = ? ,placed_at =?  WHERE order_id = ?',[req.body.status ,date.format(new Date(), 'hh:mm A'),req.body.orderId],(err,data)=>{
      if(err){

        return res.redirect('/admin/orders')
        console.log(data)
      }

      //console.log(data)
      //emit event
      const eventEmitter = req.app.get('eventEmitter')
      eventEmitter.emit('orderUpdated',{id:req.body.orderId, status: req.body.status,placed_at: date.format(new Date(), 'hh:mm A')})
      return res.redirect('/admin/orders');

    })

}