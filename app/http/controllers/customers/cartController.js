


exports.cart = (req,res) =>{
    

    res.render('customers/cart')
}

//for the first time creating cart and adding basic object structure
exports.update = (req,res) => {
    if (!req.session.cart){  //when cart is empty
          req.session.cart = {
              items: {},
              totalQty:0,
              totalPrice:0
          }
    
    }
    let cart =req.session.cart 

    //check if item does not exist in cart
    if(!cart.items[req.body.id]){
        cart.items[req.body.id]={
            item:req.body,
            qty:1
        }
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price
    }
    else{
        cart.items[req.body.id].qty =  cart.items[req.body.id].qty + 1
        cart.totalQty =  cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;

    }

    // return res.json({totalQty: req.session.cart.totalQty})
    return res.json({totalQty: req.session.cart.totalQty})
}



exports.remove = (req,res) => {
    let cart = req.session.cart;
    if (cart.totalQty > 0) {
      cart.totalQty = cart.totalQty - 1;
      cart.totalPrice = cart.totalPrice - req.body.price;

      if (cart.items[req.body.id].qty === 1) {
        delete cart.items[req.body.id];
      } else {
        cart.items[req.body.id].qty = cart.items[req.body.id].qty - 1;
      }
      if (cart.totalQty === 0) {
        delete req.session.cart;
      }
    }
    let totalQty = cart ? cart.totalQty : 0;
    return res.json({ totalQty: totalQty, cartItems: cart.items  });

}