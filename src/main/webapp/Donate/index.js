// Get the sign-in button element by its ID
const donateFund = document.getElementById('donate-fund');

// Add click event listener to the sign-in button
donateFund.addEventListener('click', (e) => {

    e.preventDefault();

    // Get the values from the input fields
    const email = localStorage.getItem("user");
    const amount = document.getElementById('amount').value;

    // Create the data object to send in the POST request
    const data = {
        email: email,
        amount: amount
    };

    // Set the request URL
    const url = 'http://localhost:8080/MiniPaws/FundDonate';

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

// Get the sign-in button element by its ID
const donatePet = document.getElementById('donate-pet');

// Add click event listener to the sign-in button
donatePet.addEventListener('click', (e) => {

    e.preventDefault();

    // Get the values from the input fields
    const new_pet_name = document.getElementById('new-pet-name').value;
    const new_pet_breed = document.getElementById('new-pet-breed').value;
    const new_pet_gender = document.getElementById('new-pet-gender').value;
    const new_pet_type = document.getElementById('new-pet-type').value;

    // Create the data object to send in the POST request
    const pet_data = {
        name: new_pet_name,
        breed: new_pet_breed,
        gender: new_pet_gender,
        animal_type: new_pet_type
    };

    // Set the request URL
    const url_create_pet = 'http://localhost:8080/MiniPaws/Pet';

    // Create the request options
    const requestOptionsPet = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet_data)
    };

    // Send the POST request using fetch
    fetch(url_create_pet, requestOptionsPet)
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

                // Create the data object to send in the POST request
                const donate_data = {
                    email: localStorage.getItem('user'),
                    pet_id: responseData.id,
                };

                // Set the request URL
                const url_donate_pet = 'http://localhost:8080/MiniPaws/PetDonate';

                // Create the request options
                const requestOptionsDonate = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(donate_data)
                };

                // Send the POST request using fetch
                fetch(url_donate_pet, requestOptionsDonate)
                    .then(response => {
                        if (response.ok) {
                            // Parse the response JSON data
                            return response.json();
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
            } else {
                alert('Invalid. Please try again.');
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            // Handle any errors here
        });
});