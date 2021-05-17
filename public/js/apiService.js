export function placeOrders(formObject){
    axios.post('/orders', formObject).then((res)=>{
        alert(res.data.message)
            //alert('added') 
        setTimeout(()=>{
         window.location.href = '/customer/orders'
        },1000)
    
       // console.log(res.data)
       }).catch((err)=>{
         //console.log(err)
         alert(err.res.data.message)
       })
}