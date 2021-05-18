const mysql = require('mysql');
const db = require('../../../config/connection')
const date = require('date-and-time');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)



exports.store = (req, res) => {
    // console.log(req.body)
    //validate request

    const { phone, address, stripeToken, paymentType } = req.body
    if (!phone || !address) {
        //return req.flash('error', 'All fields are required')
        return res.status(400).json({ message: 'All fields are required' })

        // return res.redirect('/cart')

    }

    const customer_id = req.user[0].id;
    const items = JSON.stringify(req.session.cart.items);
    // console.log(`customer_Id = ${items}`)


    db.query('INSERT INTO orders SET items=?,phone=?,address=?,customer_id=?,placed_at=?', [items, phone, address, customer_id, date.format(new Date(), 'hh:mm A')], (err, rows) => {
        // console.log(rows)
        if (!err) {
            //stripe payment
            if (paymentType === 'card') {
                 ///you can take more details from form
                stripe.customers.create({
                    email: 'pksingh706586@gmail.com',
                    name: 'Prashant'
                   
                })
                .then((customer)=>{
                   
                return stripe.charges.create({
                    amount: req.session.cart.totalPrice * 100,
                    source: stripeToken,
                    currency: 'inr',
                    description: `Pizza order(customer-id): ${customer.id}`
                })
                }).then((charge) => {
                    // rows.paymentStatus = true;
                    db.query('UPDATE orders SET paymentStatus=?,paymentType=? WHERE orders.paymentStatus=?', [true,paymentType,false], (err, r) => {
                        if (!err) {
                            console.log(r)
                            delete req.session.cart
                            return res.json({ message: 'Payment Successful,Order placed succsessfully..' })
                        } else {
                            console.log(err)
                        }

                    })
                }).catch((err) => {
                    console.log(err)
                    delete req.session.cart
                    return res.json({ message: 'Order placed but  Payment failed,you can pay at delivery time.' })
                })
            } else{
                delete req.session.cart
                return res.json({ message: 'Order placed succesfully' })
            }



        } else {
            console.log(err)

            // req.flash('error', 'Something went wrong')
            return res.status(500).json({ message: 'something went wrong' })


        }
    })
}


exports.index = (req, res) => {

    db.query('SELECT * FROM orders WHERE customer_id=? AND orders.status !="completed" ', [req.user[0].id], (err, orders) => {
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

    db.query('SELECT * FROM orders WHERE order_id=?', [req.params.order_id], (err, order) => {
        //Authorize user

        if (!err && req.user.id === order.customer_id) {
            res.render('customers/singleOrder', { order })
            //console.log(order)
        } else {
            console.log(err)
            res.redirect('/')
        }
    })
}