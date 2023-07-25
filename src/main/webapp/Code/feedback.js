// Get the feedback form element by its ID
const feedbackForm = document.getElementById('feedbackForm');

// Add submit event listener to the form
feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the values from the input fields
  const name = document.getElementById('feedbackName').value;
  const email = document.getElementById('feedbackEmail').value;
  const message = document.getElementById('feedbackMessage').value;

  // Create the data object to send in the POST request
  const data = {
    name: name,
    email: email,
    message: message
  };

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set the HTTP method and URL
  xhr.open('POST', 'https://example.com/feedback', true);

  // Set the request headers
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Define the onload event handler
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Handle successful response here
      console.log('Feedback submitted successfully');
    } else {
      console.error('Error submitting feedback:', xhr.statusText);
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
