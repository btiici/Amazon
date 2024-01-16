import {cart, removeFromCart, updateDeliveryOption} from "../Cart/cart.js";
import {product} from '../data.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../Cart/deliveryOptions.js'

function renderOrderSummary () {
    let cartSummaryHtml ='';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId

        let matchingProduct;

        product.forEach((products) => {
        
            if (products.id === productId){
                matchingProduct = products;
            }
        });

       const deliveryOptionsId = cartItem.deliveryOptionsId;

        let deliveryOption = '';

        deliveryOptions.forEach ((option) => {
            if (option.id === deliveryOptionsId){
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format ('dddd, MMMM D');

        cartSummaryHtml += `<div class="items js-items-${matchingProduct.id}">
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
                <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
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
            data-product-id= "${matchingProduct.id}"
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
        });
    });

    document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener ('click', () => {
            const productId = element.dataset.productId
            const deliveryOptionsId = element.dataset.deliveryOptionsId
            updateDeliveryOption(productId, deliveryOptionsId)
            renderOrderSummary ();
        })
})
}

renderOrderSummary ();