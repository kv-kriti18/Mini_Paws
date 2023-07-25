// Get the signup button element by its ID
const signupButton = document.getElementById('signupButton');

// Add click event listener to the signup button
signupButton.addEventListener('click', () => {
  // Get the values from the input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Check if the passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Create the data object to send in the POST request
  const data = {
    email: email,
    password: password
  };

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set the HTTP method and URL
  xhr.open('POST', 'https://example.com/signup', true);

  // Set the request headers
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Define the onload event handler
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Navigate to the home page after successful signup
      window.location.href = 'http://localhost:5500/home';
    } else {
      console.error('Error signing up:', xhr.statusText);
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

