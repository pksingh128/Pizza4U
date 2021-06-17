const mysql = require('mysql');
const db = require('../../../config/connection')
const date = require('date-and-time');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
//const nodemailer = require('nodemailer');
const sendMail = require('../../../../services/emailServices');



exports.store = (req, res) => {
    // console.log(req.body)
    //validate request

    const { phone, email,address, stripeToken, paymentType } = req.body
    const customer_id = req.user[0].id;
    const items = JSON.stringify(req.session.cart.items);

    if (!phone || !address) {

        return res.json({ message: 'All fields are required' })
    }

    if (paymentType === 'cod') {
        db.query('INSERT INTO orders SET items=?,phone=?,address=?,customer_id=?,placed_at=?', [items, phone, address, customer_id, date.format(new Date(), 'hh:mm A')], (err, rows) => {
            console.log(rows)
            if (!err) {
             
                sendMail ({
                    from: process.env.EMAIL,
                  to: email,
                  subject: 'Order Confirmation',
                  text: 'Hello world?',
                  html: require('../../../../services/emailTemplate')({
                      amount: req.session.cart.totalPrice,
                      totalQty: req.session.cart.totalQty,
                      paymentType: paymentType,
                      address: address,
                      phone: phone,
                      email:email
                  })
                })

                delete req.session.cart
                return res.json({ message: 'Order placed succesfully and Email has been sent ' })

            }
            else {
                console.log(err)

              
                return res.status(500).json({ message: 'something went wrong' })
            }
        })
}
    else {

        ///you can take more details from form
        stripe.customers.create({

            name: 'Prashant'

        })
            .then((customer) => {

                return stripe.charges.create({
                    amount: req.session.cart.totalPrice * 100,
                    source: stripeToken,
                    currency: 'inr',
                    description: `Pizza order(customer-id): ${customer.id}`
                })
            }).then((charge) => {
               

                db.query('INSERT INTO orders SET items=?,phone=?,address=?,customer_id=?,placed_at=?, paymentStatus=?,paymentType=?', [items, phone, address, customer_id, date.format(new Date(), 'hh:mm A'), true, paymentType], (err, r) => {
                    if (!err) {
                        console.log(r)

                       sendMail ({
                        from: process.env.EMAIL,
                      to: email,
                      subject: 'Order Confirmation',
                      text: 'Hello world?',
                      html: require('../../../../services/emailTemplate')({
                          amount: req.session.cart.totalPrice,
                          totalQty: req.session.cart.totalQty,
                          paymentType: paymentType,
                          address: address,
                          phone: phone,
                          email:email
                      })
                    })

                        delete req.session.cart
                        return res.json({ message: 'Payment Successful,Order placed succsessfully,email has been sent.' })
                    } else {
                        console.log(err)
                    }

                })
            }).catch((err) => {
                console.log(err)
                delete req.session.cart
                return res.json({ message: 'Order placed but  Payment failed,you can pay at delivery time.' })
            })


    }


}




exports.index = (req, res) => {

    db.query('SELECT * FROM orders WHERE customer_id=? AND orders.status !="completed" ORDER BY order_id DESC ', [req.user[0].id], (err, orders) => {
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