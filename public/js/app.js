//import axios from 'axios'

let addToCarts = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

 //console.log(carts)
function updateCart(pizza){
  axios.post('/update-cart',pizza).then(res=>{
      //console.log(res)
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