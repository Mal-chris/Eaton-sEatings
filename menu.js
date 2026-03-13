let currentSideType = '';
let currentSideSize = '';
let currentSidePrice = 0;
let currentBeverageType = '';
let currentBeverageSize = '';
let currentBeveragePrice = 0;
let cartItems = {};
let total = 0;


function setSideType(type) {
    currentSideType = type;
    document.getElementById('sizeSelection').classList.remove('d-none');
    
    document.querySelectorAll("input[name='sideType']").forEach(input => {
        if (input.value !== type) input.checked = false;
    });
}

function selectSize(size, price) {
    currentSideSize = size;
    currentSidePrice = price;
}


function setBeverageType(type) {
    currentBeverageType = type;
    document.getElementById('beverageSizeSelection').classList.remove('d-none');
    
    document.querySelectorAll("input[name='beverageType']").forEach(input => {
        if (input.value !== type) input.checked = false;
    });
}


function selectBeverageSize(size, price) {
    currentBeverageSize = size;
    currentBeveragePrice = price;
}


function updateQuantity(itemType, change) {
    const quantityElement = document.getElementById(`quantity-${itemType}`);
    let quantity = parseInt(quantityElement.innerText);
    quantity += change;
    if (quantity < 0) quantity = 0;
    quantityElement.innerText = quantity;
}


function addToCart(itemType, itemPrice = 0) {
    const quantityElement = document.getElementById(`quantity-${itemType}`);
    const quantity = parseInt(quantityElement.innerText);

    if (quantity > 0) {
        let itemKey;

        if (itemType === 'Sides') {
            if (!currentSideType || !currentSideSize) {
                alert('Please select a side type and size.');
                return;
            }
            itemKey = `${currentSideType} (${currentSideSize})`;
            itemPrice = currentSidePrice;
        } else if (itemType === 'Beverages') {
            if (!currentBeverageType || !currentBeverageSize) {
                alert('Please select a beverage type and size.');
                return;
            }
            itemKey = `${currentBeverageType} (${currentBeverageSize})`;
            itemPrice = currentBeveragePrice;
        } else {
            
            itemKey = itemType; 
        }

        if (!cartItems[itemKey]) {
            cartItems[itemKey] = { price: itemPrice, quantity };
        } else {
            cartItems[itemKey].quantity += quantity;
        }

       
        updateCart();
        alert(`Added ${quantity} ${itemKey} to cart.`);
    } else {
        alert('Please select a valid quantity.');
    }
}


function updateCart() {
    const cartList = document.getElementById('cartItems');
    cartList.innerHTML = '';
    let cartCount = 0;
    let cartTotal = 0;

    for (let item in cartItems) {
        const cartItem = cartItems[item];
        cartCount += cartItem.quantity;
        cartTotal += cartItem.price * cartItem.quantity;

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            ${item} - ${cartItem.quantity} x $${cartItem.price.toFixed(2)}
            <button class="btn btn-sm btn-danger float-end ms-2" onclick="removeItem('${item}')">Remove</button>`;
        cartList.appendChild(listItem);
    }

    
    document.getElementById('cartCount').innerText = cartCount;
    document.getElementById('cartTotal').innerText = cartTotal.toFixed(2);
    document.getElementById('cartTotalPrice').innerText = cartTotal.toFixed(2);

   
    total = cartTotal;
}

function removeItem(itemKey) {
    if (cartItems[itemKey]) {
        delete cartItems[itemKey];
        updateCart(); 
    }
}


document.getElementById('confirmOrderBtn').addEventListener('click', function () {
    if (total > 0) {
        alert(`Order Confirmed! Total: $${total.toFixed(2)}`);
        
        cartItems = {};
        total = 0;
        updateCart();

        
        const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
        cartOffcanvas.hide();

        
        document.getElementById('address').value = '';
    } else {
        alert('Your cart is empty. Please add items to your order.');
    }
});


       
        const map = L.map('map').setView([18.1096, -77.2975], 13); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        document.getElementById('getLocation').addEventListener('click', function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const userLocation = [position.coords.latitude, position.coords.longitude];
                    map.setView(userLocation, 13);
                    L.marker(userLocation).addTo(map)
                        .bindPopup("Your Location")
                        .openPopup();
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        });