export let cart = JSON.parse(localStorage.getItem('Cart'));

if (!cart) {
    cart =[{
        productId :"54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity: 2,
        deliveryOptionsId: '1'
    },
    {
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity : 1, 
        deliveryOptionsId: '2'
    }];
}

function saveToLocalStorage () {
    localStorage.setItem('Cart', JSON.stringify(cart));
}

export function addToCart (productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
        });

        if (matchingItem){
        matchingItem.quantity += 1;
        }else {
            cart.push({
                productId : productId,
                quantity : 1,
                deliveryOptionsId : '1'
            });
        }
        saveToLocalStorage ();
    }

export function removeFromCart (productId) {
        const newCart =[];

        cart.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
            newCart.push(cartItem)
            }
        });

        cart = newCart;

        saveToLocalStorage();
    }

export function updateDeliveryOption (productId, deliveryOptionsId) {
    
    let matchingItem;
    

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
        });
        
        matchingItem.deliveryOptionsId = deliveryOptionsId;

        saveToLocalStorage();
    } 
