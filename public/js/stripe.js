
import { placeOrders } from './apiService.js'

export async function initStripe() {

  const stripe = Stripe('pk_test_51IrQ0mSGOorTOMQEanjhV984S5ooavW3hAvPgnxxvODzkMo1b7WR9nM4XTD49ye9gcEyC3wu0KPE1kLAwfyvOuee00jTC9cuzN');//Use Stripe(publishableKey, options?) to create an instance of the Stripe object. 
  //create an element instance which manages the group of elements
  let card = null;
  function mountWidget() {
    const elements = stripe.elements()

    let style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    card = elements.create('card', { style, hidePostalCode: true })
    //attaches your Element to the DOM.
    card.mount('#card-element')

  }


  const paymentType = document.querySelector('#paymentType')
  if (!paymentType) {
    return;
  }
  paymentType.addEventListener('change', (e) => {
    //console.log(e.target.value)
    if (e.target.value === 'card') {
      //display widget
      mountWidget()

    } else {
      card.destroy()
    }
     passive: true;
  })


  //ajex call
  const paymentForm = document.querySelector('#payment-form')
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let formData = new FormData(paymentForm);//js inbuild class for get data from form
      let formObject = {}
      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
        // console.log(key,value)

      }

      if (!card) {
        //Ajax
        placeOrders(formObject)
        return;
      }
      // varify card // send req to stripe server and getb tokens
      stripe.createToken(card).then((result) => {
      //  console.log(result)
        formObject.stripeToken = result.token.id;
        placeOrders(formObject)
      }).catch((err) => {
        console.log(err)
      })

    })
  }


}