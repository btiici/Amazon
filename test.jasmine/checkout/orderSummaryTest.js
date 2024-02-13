import {renderOrderSummary} from "../../Checkout/orderSummary.js";
import {loadFromStorage, cart} from "../../Cart/cart.js";

describe('test suite: renderOrderSummary', () => {
    it('displays the cart', () => {
        document.querySelector('.js-test-container')
        .innerHTML = `
        <div class="js-orders"></div>
        <div class="js-carts-quantity"></div>
        `;

        const productId1 = "54e0eccd-8f36-462b-b68a-8182611d9add"
        const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId :productId1,
                quantity: 2,
                deliveryOptionsId: '1'
            },
            {
                productId :productId2,
                quantity : 1, 
                deliveryOptionsId: '2'
            }]);
    });
    loadFromStorage ();

    renderOrderSummary();

    expect(
        document.querySelectorAll('.js-items').length
    ).toEqual(2)
    expect(
        document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2')
    expect(
        document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1')

    document.querySelector('.js-test-container')
    .innerHTML = '';
})

it('removes a product', () => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container')
    .innerHTML = `
    <div class="js-orders"></div> 
    <div class="js-payment-summary"></div>
    <div class="js-carts-quantity"></div>
    `;

    const productId1 = "54e0eccd-8f36-462b-b68a-8182611d9add"
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
            productId :productId1,
            quantity: 2,
            deliveryOptionsId: '1'
        },
        {
            productId :productId2,
            quantity : 1, 
            deliveryOptionsId: '2'
        }]);
});
loadFromStorage ();

renderOrderSummary();

document.querySelector(`.js-delete-link-${productId1}`).click();
expect(
    document.querySelectorAll('.js-items').length
).toEqual(1);
expect(
    document.querySelector(`.js-items-${productId1}`)
).toEqual(null);
expect(
    document.querySelector(`.js-items-${productId2}`)
).not.toEqual(null);
expect(cart.length).toEqual(1);
expect(cart[0].productId).toEqual(productId2)

document.querySelector('.js-test-container')
.innerHTML = '';
})
});