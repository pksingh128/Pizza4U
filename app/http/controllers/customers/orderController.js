const mysql = require('mysql');
const db = require('../../../config/connection')
const date = require('date-and-time');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const nodemailer = require('nodemailer');



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
                //stripe payment


                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASS,
                    },

                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: `"Pizza corner" <${process.env.EMAIL}>`, // sender address
                    to: email, // list of receivers
                    subject: 'Order Confirmation', // Subject line
                    text: 'Hello world?', // plain text body
                    html: `<strong>Thanks for the Order</strong>
                      <h3>Order summary</h3>
                       <ul>
                       <li>Amount: ${req.session.cart.totalPrice} </li>
                       <li>Total-Qty: ${req.session.cart.totalQty} </li>
                       <li>Payment-Type:(${paymentType}) : pay at delivary time</li>
                       </ul>
                       <h3>Customer Details</h3>
                       <ul>
                       <li>Address: ${address} </li>
                       <li>Phone Number: ${phone} </li>
                       <li>Email: ${email} </li>
                       </ul>`// html body// html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


                });
                delete req.session.cart
                return res.json({ message: 'Order placed succesfully and Email has been sent ' })



            }
            else {
                console.log(err)

                // req.flash('error', 'Something went wrong')
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
                // rows.paymentStatus = true;
                // rows.paymentType = paymentType

                db.query('INSERT INTO orders SET items=?,phone=?,address=?,customer_id=?,placed_at=?, paymentStatus=?,paymentType=?', [items, phone, address, customer_id, date.format(new Date(), 'hh:mm A'), true, paymentType], (err, r) => {
                    if (!err) {
                        console.log(r)


                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.EMAIL,
                                pass: process.env.PASS,
                            },

                        });

                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: `"Pizza corner" <${process.env.EMAIL}>`, // sender address
                            to: email, // list of receivers
                            subject: 'Order Confirmation', // Subject line
                            text: 'Hello world?', // plain text body
                            html: `<strong>Thanks for the Order</strong>
                            <h3>Order summary</h3>
                             <ul>
                             <li>Amount: ${req.session.cart.totalPrice} </li>
                             <li>Total-Qty: ${req.session.cart.totalQty} </li>
                             <li>Payment-Type:(${paymentType}) : it's paid online</li>
                             </ul>
                             <h3>Customer Details</h3>
                             <ul>
                             <li>Address: ${address} </li>
                             <li>Phone Number: ${phone} </li>
                             <li>Email: ${email} </li>
                             </ul>`// html body
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


                        });

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


// if (paymentType === 'card') { 
//     ///you can take more details from form
//    stripe.customers.create({
//        email: 'pksingh706586@gmail.com',
//        name: 'Prashant'

//    })
//    .then((customer)=>{

//    return stripe.charges.create({
//        amount: req.session.cart.totalPrice * 100,
//        source: stripeToken,
//        currency: 'inr',
//        description: `Pizza order(customer-id): ${customer.id}`
//    })
//    }).then((charge) => {
//        rows.paymentStatus = true;
//        rows.paymentType = paymentType

//        db.query('INSERT INTO orders SET items=?,phone=?,address=?,customer_id=?,placed_at=?, paymentStatus=?,paymentType=? WHERE paymentType != ?', [items, phone, address, customer_id, date.format(new Date(), 'hh:mm A'),rows.paymentStatus,rows.paymentType,'COD'], (err, r) => {
//            if (!err) {
//                console.log(r)
//                delete req.session.cart
//                return res.json({ message: 'Payment Successful,Order placed succsessfully..' })
//            } else {
//                console.log(err)
//            }

//        })
//    }).catch((err) => {
//        console.log(err)
//        delete req.session.cart
//        return res.json({ message: 'Order placed but  Payment failed,you can pay at delivery time.' })
//    })
// }


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