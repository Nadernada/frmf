/*
* Palo Alto Theme
*
* Use this file to add custom Javascript to Palo Alto.  Keeping your custom
* Javascript in this fill will make it easier to update Palo Alto. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/


(function() {
  // Add custom code below this line
  document.addEventListener('DOMContentLoaded', function() {
    const teamRadios = document.querySelectorAll('input[name="options[teams]"]');
    const playerFieldset = document.getElementById('player-radio-buttons');
    const sizeFieldset = document.getElementById('size-radio-buttons');
    const siblingProducts = document.querySelectorAll('.sibling-product');
    const addToCartButton = document.getElementById('add-to-cart-btn');
    
    let selectedPlayer = '';
    let selectedSize = '';
  
    // Function to update player options based on selected team
    function updatePlayers(team) {
      // Clear existing player options
      playerFieldset.innerHTML = '';
  
      // Get the corresponding players based on the selected team
      const players = document.querySelectorAll(`#${team}-players span`);
  
      // Populate the fieldset with player radio buttons
      players.forEach((player, index) => {
        const playerValue = player.getAttribute('data-player');
        const radioMarkup = `
          <span class="radio__button">
            <input class="radio__input" type="radio" id="player-${playerValue}" name="properties[player]" value="${playerValue}" ${index === 0 ? 'checked' : ''}>
            <label class="radio__label" for="player-${playerValue}">${playerValue}</label>
          </span>
        `;
        playerFieldset.insertAdjacentHTML('beforeend', radioMarkup);
      });
  
      // Set the first player and update sizes for the selected player
      const firstPlayer = players[0].getAttribute('data-player');
      selectedPlayer = firstPlayer;
      updateSizes(firstPlayer);
  
      // Add event listeners for player selection changes
      document.querySelectorAll('input[name="properties[player]"]').forEach(radio => {
        radio.addEventListener('change', function() {
          const selectedPlayer = document.querySelector('input[name="properties[player]"]:checked').value;
          updateSizes(selectedPlayer);
        });
      });
    }
  
    // Function to update size options based on the selected player
    function updateSizes(player) {
      // Clear existing size options
      sizeFieldset.innerHTML = '';
  
      // Find the corresponding variants for the selected player
      const playerVariants = JSON.parse(document.getElementById('variant-data').textContent);
      const availableSizes = playerVariants.filter(variant => variant.player === player).map(variant => variant.size);
  
      // Populate the size fieldset with available sizes
      availableSizes.forEach(size => {
        const sizeMarkup = `
          <span class="radio__button">
            <input class="radio__input" type="radio" id="size-${size}" name="properties[size]" value="${size}">
            <label class="radio__label" for="size-${size}">${size}</label>
          </span>
        `;
        sizeFieldset.insertAdjacentHTML('beforeend', sizeMarkup);
      });
  
      // Update the selected size
      if (availableSizes.length > 0) {
        selectedSize = availableSizes[0];
        document.querySelector(`input[name="properties[size]"]`).checked = true;
      }
  
      // Add event listener to update selectedSize on size selection change
      document.querySelectorAll('input[name="properties[size]"]').forEach(radio => {
        radio.addEventListener('change', function() {
          selectedSize = document.querySelector('input[name="properties[size]"]:checked').value;
        });
      });
    }
  
    // Function to update the main product display with sibling products
    function updateMainProduct(productId) {
      // Replace the current main product display with the selected sibling product
      const siblingProduct = document.querySelector(`.sibling-product[data-product-id="${productId}"]`);
      // const productTitle = siblingProduct.querySelector('.sibling-title').textContent;
      const productImage = siblingProduct.querySelector('.sibling-image').getAttribute('src');
  
      // Update the main product display
      const mainImg = document.getElementById('main-custom-img');
      if (mainImg) {

        mainImg.setAttribute('src', productImage);
      }
  
      // Optionally, update the product variant or any other relevant data here
    }
  
    // Add event listeners for sibling product clicks
    siblingProducts.forEach(product => {
      product.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        updateMainProduct(productId);
      });
    });
  
    // Add to Cart functionality
    if(addToCartButton) {

    addToCartButton.addEventListener('click', function() {
      const formData = {
        items: [{
          id: '{{ product.variants.first.id }}', // Replace with actual variant ID
          quantity: 1,
          properties: {
            'Player': selectedPlayer,
            'Size': selectedSize
          }
        }]
      };
  
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(response => {
        return response.json();
      }).then(data => {
        // Handle success
        console.log('Added to cart:', data);
      }).catch(error => {
        console.error('Error adding to cart:', error);
      });
    });
  }

  
    // Initialize the section with the Men's team
    updatePlayers('mens');
  
    // Listen for team selection change
    teamRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        const selectedTeam = document.querySelector('input[name="options[teams]"]:checked').value;
        updatePlayers(selectedTeam);
      });
    });
  });
  
  




  


  // ^^ Keep your scripts inside this IIFE function call to
  // avoid leaking your variables into the global scope.
})();
