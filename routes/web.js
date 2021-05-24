
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const contactController =  require('../app/http/controllers/customers/contactController')

const orderController = require('../app/http/controllers/customers/orderController')

const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

//middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')



function initRoutes(app){
    
app.get('/',homeController.index)
app.get('/login',guest,authController.login)
app.post('/login',authController.postLogin)
app.get('/register',guest, authController.register)
app.post('/register',authController.postRegister)
app.post('/logout',authController.logout)

app.get('/cart',auth,cartController.cart)
app.post('/update-cart',auth,cartController.update)


//contact
app.get('/contact',auth,contactController.contact)
app.post('/contact',auth,contactController.postContact)


//customer routes
app.post('/orders',auth,orderController.store)
app.get('/customer/orders',auth,orderController.index)
app.get('/customer/orders/:order_id',auth,orderController.show)

//admin routes
app.get('/admin/orders',admin,adminOrderController.index)

//admin/order/status

app.post('/admin/order/status',admin,statusController.update)

}


module.exports = initRoutes;