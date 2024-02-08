import {cart, addToCart} from "./Cart/cart.js"
import {product} from "./data.js"


function toggleDropdownMenu() {
    const dropdownMenu = document.querySelector('.js-toggle-menu-dropdown');
    const isOpened = dropdownMenu.classList.contains('toggle-menu-opened');

    if (!isOpened) {
      dropdownMenu.classList.add('toggle-menu-opened');
    } else {
      dropdownMenu.classList.remove('toggle-menu-opened');
    }
  }

const menu = document.querySelector('.js-toggle')
menu.addEventListener ('click', () => {
    toggleDropdownMenu()
})


let productsHTML = '';

product.forEach((product)  => {
        
 const html = ` 
 <div class="product-container">
        <div class="product-img">
            <img src="${product.image}" alt="">
        </div>
        <div class="product-name limit-text">
            ${product.name}
        </div>
        <div class="product-rating">
        <img src="images/ratings/rating-${product.rating.stars  * 10}.png" alt="" class="rating-img"> <span class="rating-count">${product.rating.count}</span>
        </div>
        <div class="product-price">
            $${(product.priceCents  / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
            <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
        </div>
        <div>
            <div class="added-to-cart js-added">
                <img src="images/icons/checkmark.png">Added
            </div>            
            <button class="add-to-cart js-add-to-cart" data-product-id = "${product.id}"
            >Add to Cart</button>
        </div>
 </div>`

    productsHTML += html;
})


document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity () {
        let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity;
        })

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
        document.querySelector('.js-cart-quantitys').innerHTML = cartQuantity
    }

    updateCartQuantity ();

function added () {
    const addedMessage = document.querySelector('.js-added')
    addedMessage.classList.add('is-added')
       

    const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('is-added');
      }, 2000);
}

document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    button.addEventListener ('click', () => {
        const productId = button.dataset.productId;
        addToCart (productId);
        updateCartQuantity ();
        added();
    });
});
