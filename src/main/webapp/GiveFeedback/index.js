// Get the sign-in button element by its ID
const sendFeedback = document.getElementById('send-feedback');

// Add click event listener to the sign-in button
sendFeedback.addEventListener('click', (e) => {

    e.preventDefault();

    const message = document.getElementById('message').value;

    // Create the data object to send in the POST request
    const data = {
        email: localStorage.getItem('user'),
        message: message
    };

    // Set the request URL
    const url = 'http://localhost:8080/MiniPaws/Feedback';

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
