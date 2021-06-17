module.exports = ({amount,totalQty, paymentType,address,phone,email})=>{
    return`
    <strong>Thanks for the Order</strong>
                      <h3>Order summary</h3>
                       <ul>
                       <li>Amount: ${amount} </li>
                       <li>Total-Qty: ${totalQty} </li>
                       <li>Payment-Type:(${paymentType})</li>
                       </ul>
                       <h3>Customer Details</h3>
                       <ul>
                       <li>Address: ${address} </li>
                       <li>Phone Number: ${phone} </li>
                       <li>Email: ${email} </li>
                       </ul>
    `
}