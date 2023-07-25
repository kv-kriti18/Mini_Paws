window.addEventListener('load', function () {
    // Get the stored values from localStorage
    const selectedPetName = localStorage.getItem('selectedPetName');
    const selectedPetBreed = localStorage.getItem('selectedPetBreed');
    const selectedPetGender = localStorage.getItem('selectedPetGender');
    const selectedPetAnimalType = localStorage.getItem('selectedPetAnimalType');

    // Set the values to the corresponding elements
    document.getElementById('pet-name').textContent = selectedPetName;
    document.getElementById('pet-breed').textContent = selectedPetBreed;
    document.getElementById('pet-gender').textContent = selectedPetGender;
    document.getElementById('pet-animal-type').textContent = selectedPetAnimalType;
});

// Get the sign-in button element by its ID
const adoptButton = document.getElementById('adopt-pet');

// Add click event listener to the sign-in button
adoptButton.addEventListener('click', (e) => {

    e.preventDefault();

    // Create the data object to send in the POST request
    const data = {
        email: localStorage.getItem('user'),
        pet_id: localStorage.getItem('selectedPetId')
    };

    // Set the request URL
    const url = 'http://localhost:8080/MiniPaws/Adoption';

    // Create the request options
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // Send the POST request using fetch
    fetch(url, requestOptions)
        .then(response => {
            if (response.ok) {
                // Parse the response JSON data
                return response.json();
            } else {
                throw new Error('Error signing in: ' + response.statusText);
            }
        })
        .then(responseData => {
            // Check if responseData contains { success: true }
            if (responseData.success === true) {
                // Navigate to the home page
                window.location.href = 'http://localhost:8080/MiniPaws/Home';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            // Handle any errors here
        });
});
