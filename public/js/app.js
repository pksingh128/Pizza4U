//import axios from 'axios'
//const axios = require('axios')
import { initAdmin } from './admin.js'


let addToCarts = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

 //console.log(carts)
function updateCart(pizza){
  axios.post('/update-cart',pizza).then(res=>{
      //console.log(res)//
      cartCounter.dataset.count = res.data.totalQty
     //alert('added')
     var alerts = document.getElementById("alerts");
    alerts.innerHTML = pizza.name + " Added to cart";  
  }).catch(err=>{
    var alerts = document.getElementById("alerts");
    alerts.innerHTML ="something went wrong";  
  })
}

 addToCarts.forEach((btn)=>{
     btn.addEventListener('click', (e)=>{
         let pizza = JSON.parse(btn.dataset.pizza) //parse the strangify data
         updateCart(pizza)
         console.log(pizza)
     })
 })

 //remove alert message after some time
 const alertMsg = document.querySelector('#success-alert')
 if(alertMsg){
   setTimeout(()=>{
     alertMsg.remove()
   },2000)
 }

  initAdmin()
  
  //change order status
  //change order status
  let statuses =  document.querySelectorAll('.status-line')
 // console.log(statuses)
  let hiddenInput = document.querySelector('#hiddenInput')
  let order = hiddenInput ? hiddenInput.value : null
  order=JSON.parse(order)
 //console.log(order)
let time = document.createElement('small')


  function updateStatus(order){
  let stepCompleted = true;
  statuses.forEach((status)=>{
      let dataProp = status.dataset.status
    
      if(dataProp === order.status){
        time.innerText = order.created_at
        status.append(time)
        status.classList.add('active')
        
          let prevSibling = status.previousElementSibling
        while(prevSibling){
          prevSibling.classList.add('active')
          prevSibling = prevSibling.previousElementSibling
          //console.log(prevSibling)
         // status.previousElementSibling.classList.add('active')
         
        }
      
      
      }
  })
  }
  updateStatus(order);

  //socket
  let socket = io()
  //join
  if(order){
    socket.emit('join', `order_${order.order_id}`)
  }

 

  socket.on('orderUpdated',(data)=>{
    const updatedOrder = { ...order }
    //updatedOrder.created_at = `${new Date().getHours()} : ${new Date.getMinutes()}`
    updatedOrder.status = data.status
    //console.log(data)
    updateStatus(updatedOrder)
        //alert('added')
        var alerts = document.getElementById("alerts");
        alerts.innerHTML = "order updated";

})
  