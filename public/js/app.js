//import axios from 'axios'

let addToCarts = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

 //console.log(carts)
function updateCart(pizza){
  axios.post('/update-cart',pizza).then(res=>{
      console.log(res)
      cartCounter.dataset.count = res.data.totalQty
     
  })
}

 addToCarts.forEach((btn)=>{
     btn.addEventListener('click', (e)=>{
         let pizza = JSON.parse(btn.dataset.pizza)
         updateCart(pizza)
         console.log(pizza)
     })
 })