const express = require('express');
const router = express.Router();
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')

const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')
//middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')




router.get('/',homeController.index)
router.get('/login',guest,authController.login)
router.post('/login',authController.postLogin)
router.get('/register',guest, authController.register)
router.post('/register',authController.postRegister)
router.post('/logout',authController.logout)

router.get('/cart',cartController.cart)
router.post('/update-cart',cartController.update)


//customer routes
router.post('/orders',auth,orderController.store)
router.get('/customer/orders',auth,orderController.index)
router.get('/customer/orders/:order_id',auth,orderController.show)

//admin routes
router.get('/admin/orders',admin,adminOrderController.index)

//admin/order/status

router.post('/admin/order/status',admin,statusController.update)




module.exports = router;