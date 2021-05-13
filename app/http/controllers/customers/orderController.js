const mysql = require('mysql');
const db = require('../../../config/connection')
const date = require('date-and-time');




exports.store = (req, res) => {
    // console.log(req.body)
    //validate request

    const { phone, address } = req.body
    if (!phone || !address) {
        req.flash('error', 'All fields are required')

        return res.redirect('/cart')

    }

    const customer_id = req.user[0].id;
    const items = JSON.stringify(req.session.cart.items);
    // console.log(`customer_Id = ${items}`)


    db.query('INSERT INTO orders SET items=?,phone=?,address=?,customer_id=?,placed_at=?', [items, phone, address, customer_id,date.format(new Date(), 'hh:mm A')], (err, rows) => {
        console.log(rows)
        if (!err) {
            req.flash('success', 'Order placed succsessfully..')
            delete req.session.cart
          
            return res.redirect('/customer/orders')
        } else {
            console.log(err)
            req.flash('error', 'Something went wrong')
            return res.redirect('/cart')
        }
    })
}


exports.index = (req, res) => {

    const orders = db.query('SELECT * FROM orders WHERE customer_id=?', [req.user[0].id], (err, orders) => {
        if (!err) {

            res.header('cache-control', 'no-cache,private,no-store,must-revalidate,max-stale=0, post-check=0, pre-check=0')

            res.render('customers/orders', { orders })
            //console.log(orders)
        } else {
            console.log(err)
        }
    })
}

//
exports.show = (req, res) => {

    db.query('SELECT * FROM orders WHERE order_id=?', [req.params.order_id], (err,order) => {
        //Authorize user
        
        if (!err && req.user.id === order.customer_id) {
             res.render('customers/singleOrder', {order })
            //console.log(order)
        } else {
            console.log(err)
            res.redirect('/')
        }
    })
}