// Get the donation form element by its ID
const donationForm = document.getElementById('donationForm');

// Add submit event listener to the form
donationForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the values from the input fields
  const amount = document.getElementById('donationAmount').value;
  const name = document.getElementById('donorName').value;
  const email = document.getElementById('donorEmail').value;

  // Create the data object to send in the POST request
  const data = {
    amount: amount,
    name: name,
    email: email
  };

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set the HTTP method and URL
  xhr.open('POST', 'https://example.com/donate', true);

  // Set the request headers
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Define the onload event handler
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Handle successful response here
      console.log('Donation submitted successfully');
    } else {
      console.error('Error submitting donation:', xhr.statusText);
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
