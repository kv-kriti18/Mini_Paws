// Get the sign-in button element by its ID
const signInButton = document.getElementById('signInButton');
// Get the signup button element by its ID
const signupButton = document.getElementById('signupButton');

// Add click event listener to the sign-in button
adoptButton.addEventListener('click', (e) => {

  e.preventDefault();

  // Get the values from the input fields
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;

  // Create the data object to send in the POST request
  const data = {
    email: email,
    password: password
  };

  // Set the request URL
  const url = 'http://localhost:8080/MiniPaws/Auth';

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
        localStorage.setItem('user', email)
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

// Add click event listener to the signup button
signupButton.addEventListener('click', (e) => {

  e.preventDefault();

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

  console.log(data);

  // Set the request URL
  const url = 'http://localhost:8080/MiniPaws/Signup';

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
      // Print the received data
      console.log(responseData);

      // Check if responseData contains { success: true }
      if (responseData.success === true) {
        // Navigate to the home page
        localStorage.setItem('user', email)
        window.location.href = 'http://localhost:8080/MiniPaws/Home';
      } else {
        alert('Unable to signup');
      }
    })
    .catch(error => {
      console.error('Request failed:', error);
      // Handle any errors here
    });
});

