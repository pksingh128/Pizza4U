import {show} from '../partials/message.js'

export function placeOrders(formObject){
    axios.post('/orders', formObject).then((res)=>{
       // alert(res.data.message)
            //alert('added') 
            show(res.data.message, "success", "cart-message")

        setTimeout(()=>{  
         window.location.href = '/customer/orders'
        },2000)
    
       // console.log(res.data)
       }).catch((err)=>{
        show(err.res.data.message, "danger", "cart-message");
         console.log(err)
         ///alert(err.data.message)
       })
}