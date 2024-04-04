import {cart, removeFromCart, updateDeliveryOption, updateQuantity} from "../Cart/cart.js";
import {product, getProduct} from '../data.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../Cart/deliveryOptions.js'
import { renderPaymentSummary } from "./paymentSummary.js";
import {renderCheckoutHeader } from './checkoutHeader.js'


export function renderOrderSummary () {

    let cartSummaryHtml ='';
    
    cart.forEach((cartItem) => {
        const productId = cartItem.productId

        const matchingProduct = getProduct(productId)
    
       const deliveryOptionsId = cartItem.deliveryOptionsId;

        let deliveryDate;
        const deliveryOption = getDeliveryOption(deliveryOptionsId);
      
        
        const today = dayjs();
                 deliveryDate = today.add(
                    deliveryOption.deliveryDays,
                    'days');
       
    
    
        const dateString = deliveryDate.format ('dddd, MMMM D');
        cartSummaryHtml += `<div class="items js-items js-items-${matchingProduct.id}">
    <div class="delivery-date">Delivery date: ${dateString} </div>
    <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

            <div class="cart-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link"
                        data-product-id="${matchingProduct.id}">
                        Update
                        </span>                       
                        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                        <span class="save-quantity-link link-primary js-save-link"
                        data-product-id = "${matchingProduct.id}">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                        Delete
                        </span>
                </div>
            </div>
            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>
    </div>`;
    });

    function deliveryOptionsHTML (matchingProduct, cartItem) {

        let html = '';

        deliveryOptions.forEach ((deliveryOption) => {

            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays, 
                'days'
            );
            const dateString = deliveryDate.format ('dddd, MMMM D');

            const priceString = deliveryOption.priceCents
            === 0
            ? 'FREE'
            : `$${deliveryOption.priceCents / 100} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

            html += `
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" 
                ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
            </div>
        `
        })
        return html
    }


    document.querySelector('.js-orders').innerHTML = cartSummaryHtml

    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            
            const container = document.querySelector(`.js-items-${productId}`)
            container.remove();

            renderPaymentSummary ();
            renderCheckoutHeader ();
        });
    });

    document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      
      const container = document.querySelector(
        `.js-items-${productId}`
      );
      container.classList.add('is-editing-quantity')
    });
  });
  
  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(
        `.js-items-${productId}`
        );
        console.log(container);
        container.classList.remove('is-editing-quantity')
        const inputQuantity = document.querySelector(`.js-quantity-input-${productId}`)
            const newQuantity = Number(inputQuantity.value);
            updateQuantity(productId, newQuantity);
            renderOrderSummary ();
            renderCheckoutHeader ();
            renderPaymentSummary ();
        })
    });
   

 
    document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener ('click', () => {
            const productId = element.dataset.productId
            const deliveryOptionsId = element.dataset.deliveryOptionId
            updateDeliveryOption(productId, deliveryOptionsId)
            renderOrderSummary ();
            renderPaymentSummary();
        })
    })
}
