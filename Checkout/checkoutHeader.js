import {cart} from '../Cart/cart.js'

export function renderCheckoutHeader () {
    let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity;
        })
document.querySelector('.js-carts-quantity').innerHTML = cartQuantity;

}

renderCheckoutHeader (); 