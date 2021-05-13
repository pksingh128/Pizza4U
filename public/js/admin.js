//import { Socket } from "socket.io"


export function initAdmin() {
  
  const orderTableBody = document.querySelector('#orderTableBody')
  let orders = []
  let markup
   axios.get('/admin/orders', {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  }).then (res=>{
    orders = res.data

    //console.log(orders) ;
    markup = generateMarkup(orders)
    console.log(markup) ;
    orderTableBody.innerHTML = markup
  }).catch(err => {
    console.log(err)
  })



  function renderItems(items) {
    let parsedItems = Object.values(items)
    ///let parsedItems = items
    return parsedItems.map((menuItem) => {
      return `
          <p>${menuItem.item.name} - ${menuItem.qty} pcs </p>
      `
    }).join('')
    //console.log(items)
  }

function generateMarkup(orders) {
  
 // console.log(orders) ;
  //for (let i=0; i<orders.length; ++i) {
    return orders.map(order =>{
       return` 
        <tr>
        <td class="border">
            <p>${order.order_id}</p>
            <div>${renderItems(JSON.parse(order.items))}</div>
        </td>
        <td class="border">${order.name}</td>
        <td class="border ">${order.address}</td>
        <td class="border ">
            <div class="d-flex ">
                <form action="/admin/order/status" method="POST">
                    <input type="hidden" name="orderId" value="${order.order_id}">
                    <select name="status" onchange="this.form.submit()"
                        class="form-select">
                        <option value="order_placed"
                            ${order.status === 'order_placed' ? 'selected' : ''}>
                            Placed</option>
                        <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>
                            Confirmed</option>
                        <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>
                            Prepared</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>
                            Delivered
                        </option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>
                            Completed
                        </option>
                    </select>
                </form>
            
            </div>
        </td>
        <td class="border px-4 py-2">
            ${order.placed_at}
        </td>
        <td class="border px-4 py-2">
            ${order.paymentStatus ? 'paid' : 'Not paid'}
        </td>
    </tr>`
}).join('')

}

}
