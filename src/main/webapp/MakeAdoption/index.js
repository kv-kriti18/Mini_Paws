// Function to create a single card element
function createCard(data) {
    // Create the outer card div element
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'm-3');
    cardDiv.style.width = '18rem';

    // Create the card image element
    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = "https://picsum.photos/300/200?category=cats";
    img.alt = 'Card image cap';
    cardDiv.appendChild(img);

    // Create the card body div element
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');
    cardDiv.appendChild(cardBodyDiv);

    // Create the card title element
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = data.name;
    cardBodyDiv.appendChild(cardTitle);

    // Create the card text element
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = data.breed;
    cardBodyDiv.appendChild(cardText);

    // Create the adopt button element
    const adoptButton = document.createElement('a');
    adoptButton.href = '#'; // Set a temporary link
    adoptButton.classList.add('btn', 'btn-primary');
    adoptButton.textContent = 'Adopt';
    cardBodyDiv.appendChild(adoptButton);

    // Add event listener to adopt button
    adoptButton.addEventListener('click', function () {
        // Set the selected pet ID in localStorage
        localStorage.setItem('selectedPetId', data.id);
        localStorage.setItem('selectedPetName', data.name);
        localStorage.setItem('selectedPetBreed', data.breed);
        localStorage.setItem('selectedPetGender', data.gender);
        localStorage.setItem('selectedPetAnimalType', data.animal_type);
        
        // Navigate to the "/AdoptionForm" page
        window.location.href = '/MiniPaws/AdoptionForm';
    });

    return cardDiv;
}


// Get the JSON data from an HTTP GET request
function getJSONData() {
    // Make the HTTP GET request using XMLHttpRequest or fetch API
    // Replace 'https://example.com/api/data' with your actual API endpoint URL
    return fetch('http://localhost:8080/MiniPaws/Pet')
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
        let rowDiv;
        cards.forEach((card, index) => {
            // Create a new row after every 6 cards
            if (index % 6 === 0) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                parentElement.appendChild(rowDiv);
            }

            // Create a column div for each card
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-md-6');
            colDiv.appendChild(card);

            // Append the card to the current row
            rowDiv.appendChild(colDiv);
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