import {cart} from '../Cart/cart.js'
import {getProduct} from '../data.js';
import {getDeliveryOption} from '../Cart/deliveryOptions.js';

export function renderPaymentSummary () {
    let productPriceCents = 0;
    let shipppingPriceCents = 0;

    cart.forEach((cartItem) => {
      const product =  getProduct(cartItem.productId);
      productPriceCents += product.priceCents * cartItem.quantity

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
      shipppingPriceCents += deliveryOption.priceCents
      
    })

    const totalBeforeTaxCents = productPriceCents + shipppingPriceCents;

    const taxCents = 0.1 * totalBeforeTaxCents;

    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary">
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${(productPriceCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${(shipppingPriceCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(totalBeforeTaxCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(totalCents / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    </div>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}