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
    // Get the team radio buttons and player fieldset
    const teamRadios = document.querySelectorAll('input[name="options[teams]"]');
    const playerFieldset = document.getElementById('player-radio-buttons');

    // Function to update player options based on selected team
    function updatePlayers(team) {
      // Clear existing player options
      playerFieldset.innerHTML = '';

      // Get the corresponding players based on the selected team
      const players = document.querySelectorAll(`#${team}-players span`);
      console.log(players);

      // Populate the fieldset with player radio buttons
      players.forEach(player => {
        const playerValue = player.getAttribute('data-player');

        const radioMarkup = `
          <span class="radio__button">
            <input class="radio__input" type="radio" id="player-${playerValue}" name="player" value="${playerValue}">
            <label class="radio__label" for="player-${playerValue}">${playerValue}</label>
          </span>
        `;
        playerFieldset.insertAdjacentHTML('beforeend', radioMarkup);
      });
    }

    // Set initial players to Men's team on page load
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
