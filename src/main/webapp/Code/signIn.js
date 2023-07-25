// Get the sign-in button element by its ID
const signInButton = document.getElementById('signInButton');

// Add click event listener to the sign-in button
signInButton.addEventListener('click', () => {
    // Get the values from the input fields
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
  
    // Create the data object to send in the POST request
    const data = {
      email: email,
      password: password
    };
  
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
  
    // Set the HTTP method and URL
    xhr.open('POST', 'https://example.com/signin', true);
  
    // Set the request headers
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    // Define the onload event handler
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Navigate to the home page after successful sign-in
        window.location.href = 'https://example.com/home';
      } else {
        console.error('Error signing in:', xhr.statusText);
        // Handle any errors here
      }
    };
  
    // Define the onerror event handler
    xhr.onerror = function() {
      console.error('Request failed');
      // Handle any errors here
    };
  
    // Convert the data object to JSON string
    const jsonData = JSON.stringify(data);
  
    // Send the POST request with the JSON data
    xhr.send(jsonData);
  });
  