// Function to create a single card element
function createCard(data) {
  // Create the outer card div element
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card', 'm-3');
  cardDiv.style.width = '18rem';

  // Create the card image element
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.src = data.imageSrc;
  img.alt = 'Card image cap';
  cardDiv.appendChild(img);

  // Create the card body div element
  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.classList.add('card-body');
  cardDiv.appendChild(cardBodyDiv);

  // Create the card title element
  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = data.title;
  cardBodyDiv.appendChild(cardTitle);

  // Create the card text element
  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.textContent = data.description;
  cardBodyDiv.appendChild(cardText);

  // Create the adopt button element
  const adoptButton = document.createElement('a');
  adoptButton.href = data.link;
  adoptButton.classList.add('btn', 'btn-primary');
  adoptButton.textContent = 'Adopt';
  cardBodyDiv.appendChild(adoptButton);

  return cardDiv;
}

// Get the JSON data from an HTTP GET request
function getJSONData() {
  // Make the HTTP GET request using XMLHttpRequest or fetch API
  // Replace 'https://example.com/api/data' with your actual API endpoint URL
  return fetch('https://example.com/api/data')
    .then(response => response.json())
    .then(data => {
      // Handle the JSON data here
      return data;
    })
    .catch(error => {
      console.error('Error retrieving JSON data:', error);
    });
}

// Function to append the cards to a specific element by ID
function appendCardsToElement(cards, elementId) {
  const parentElement = document.getElementById(elementId);
  if (parentElement) {
    cards.forEach(card => {
      parentElement.appendChild(card);
    });
  } else {
    console.error('Parent element not found');
  }
}

// Usage:
getJSONData().then(data => {
  const cards = data.map(item => createCard(item));
  appendCardsToElement(cards, 'cardContainer');
});
  