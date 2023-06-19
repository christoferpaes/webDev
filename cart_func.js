// Retrieve cart items from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to update the cart
function updateCart() {
  const cartTable = document.querySelector('#cart-table');
  const totalElement = document.querySelector('#cart-total');
  
  // Clear the existing cart table
  cartTable.innerHTML = '';

  // Iterate over cart items and populate the table
  cartItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button class="remove-button" data-id="${item.id}">Remove</button>
      </td>
    `;
    cartTable.appendChild(row);
  });

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Update the total price element
  totalElement.textContent = `$${totalPrice.toFixed(2)}`;

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeCartItem);
  });
}

// Function to remove an item from the cart
function removeCartItem(event) {
  const itemId = event.target.dataset.id;
  cartItems = cartItems.filter(item => item.id !== itemId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCart();
}

function addToCart(item) {
    // Check if item already exists in cart
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  
    if (existingItem) {
      // If item exists, increase the quantity
      existingItem.quantity += item.quantity;
    } else {
      // If item doesn't exist, add it to the cart
      cartItems.push(item);
    }
  
    // Save cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

// Call updateCart initially to populate the cart on page load
updateCart();
