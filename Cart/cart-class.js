class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if (!this.cartItems) {
            this.cartItems =[{
                productId :"54e0eccd-8f36-462b-b68a-8182611d9add",
                quantity: 2,
                deliveryOptionsId: '1'
            },
            {
                productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity : 1, 
                deliveryOptionsId: '2'
            }];
        }}

    saveToLocalStorage() {
            localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
        }  
        
    
    addToCart (productId) {
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId){
                    matchingItem = cartItem;
                }
                });
        
                if (matchingItem){
                matchingItem.quantity += 1;
                }else {
                    this.cartItems.push({
                        productId : productId,
                        quantity : 1,
                        deliveryOptionsId : '1'
                    });
                }
                this.saveToLocalStorage ();
            }

    removeFromCart (productId) {
                const newCart =[];
        
                this.cartItems.forEach((cartItem) => {
                    if (cartItem.productId !== productId) {
                    newCart.push(cartItem)
                    }
                });
        
                this.cartItems = newCart;
        
                this.saveToLocalStorage();
            }

    updateDeliveryOption (productId, deliveryOptionsId) {
        
                let matchingItem;
                
            
                this.cartItems.forEach((cartItem) => {
                    if (productId === cartItem.productId){
                        matchingItem = cartItem;
                    }
                    });
                    
                    matchingItem.deliveryOptionsId = deliveryOptionsId;
            
                    this.saveToLocalStorage();
                }

    updateQuantity (productId, newQuantity) {
                    let matchingItem;
                
                    this.cartItems.forEach((cartItem) => {
                      if (productId === cartItem.productId) {
                        matchingItem = cartItem;
                      }
                    });
                  
                    matchingItem.quantity = newQuantity;
                  
                        this.saveToLocalStorage();
                    }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart)
console.log(businessCart)