//import axios from 'axios'
//const axios = require('axios')
//import axios from 'axios'

import { initAdmin } from './admin.js'
import { initStripe } from './stripe.js'
import { show } from '../partials/message.js'



let addToCarts = document.querySelectorAll('.add-to-cart')
let removeToCart = document.querySelectorAll(".remove-to-cart");
let cartCounter = document.querySelector('#cartCounter')

 //console.log(carts);
function updateCart(pizza,url, msg){
  axios.post(url,pizza).then(res=>{
      //console.log(res)
      if(res.data.totalQty){
      cartCounter.dataset.count = res.data.totalQty
      }else{
        //cartCounter.dataset.count = ''
        res.data.totalQty = 0;
      }
      
      

    let e = document.getElementById("cart-alerts");
    e.setAttribute("class", `alert alert-success bg-success rounded-pill text-end text-white me-3 my-3`);
    e.innerText = pizza.name + " " +  msg; 
    e.style.display = "inline-block";
    setTimeout(() => {
      e.style.display = "none";
    }, 1*1000);
  
  }).catch(err=>{
    // var alerts = document.getElementById("alerts");
    // alerts.innerHTML ="something went wrong";  
    show('Please login', "danger", "cart-alerts")
  })

  

}

 addToCarts.forEach((btn)=>{
     btn.addEventListener('click', (e)=>{
         let pizza = JSON.parse(btn.dataset.pizza) //parse the strangify data
         if (pizza.item) {
          pizza = pizza.item;
      }
      let url = "/update-cart";
         updateCart(pizza,url,"added to cart")
        // console.log(pizza)
     })
 })

 removeToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
  let pizza = JSON.parse(btn.dataset.pizza);
  let url = "/remove-cart";
  updateCart(pizza.item, url, "Item removed to cart");
  
})
})

 //remove alert message after some time
 const alertMsg = document.querySelector('#success-alert')
 if(alertMsg){
   setTimeout(()=>{
     alertMsg.remove()
   },2000)
 }
 
 //calling function from app.js 
 let adminAreaPath = window.location.pathname
 if(adminAreaPath.includes('admin')){
  initAdmin()
 }
 
  
  //change order status
  //change order status
  let statuses =  document.querySelectorAll('.status-line')
  //let updateStatus = document.getElementById('updateStatus') 
 // console.log(statuses)
  let hiddenInput = document.querySelector('#hiddenInput')
  let order = hiddenInput ? hiddenInput.value : null

  order=JSON.parse(order)
 //console.log(order)
let time = document.createElement('small')


  function updateStatus(order){
  //let stepCompleted = true;
  statuses.forEach((status)=>{
      let dataProp = status.dataset.status
    
      if(dataProp === order.status){
        time.innerText = order.placed_at
      
        status.append(time)
        status.classList.add('active')
        
          let prevSibling = status.previousElementSibling
        while(prevSibling){
          prevSibling.classList.add('active')
          prevSibling = prevSibling.previousElementSibling
          //console.log(prevSibling)     
        }  
      }
  })
  }
  updateStatus(order);

  //payment widget
   initStripe()

//Ajex call for cart.hbs



  //socket
  let socket = io()


 //join
 if(order){
  socket.emit('join', `order_${order.order_id}`)
}




  socket.on('orderUpdated',(data)=>{
    const updatedOrder = { ...order }
   // console.log(updatedOrder)
  
    
    updatedOrder.placed_at = data.placed_at
    
    updatedOrder.status = data.status
    //console.log(data)
    updateStatus(updatedOrder)
        //alert('added')
        // var alerts = document.getElementById("alerts");
        // alerts.innerHTML = "order updated";
        document.getElementById('updateStatus').innerHTML = `Status:
         ${updatedOrder.status}`;
        show('order updated successfully', "success", "order-update")

})

  