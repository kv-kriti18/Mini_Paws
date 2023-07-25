// Get the form element by its ID
const adoptionForm = document.getElementById('adoptionForm');

// Add submit event listener to the form
adoptionForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Create a new FormData object to store form data
  const formData = new FormData(adoptionForm);

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set the HTTP method and URL
  xhr.open('POST', 'https://example.com/adopt', true);

  // Define the onload event handler
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Handle successful response here
      console.log('Form submitted successfully');
    } else {
      console.error('Error submitting form:', xhr.statusText);
      // Handle any errors here
    }
  };

  // Define the onerror event handler
  xhr.onerror = function() {
    console.error('Request failed');
    // Handle any errors here
  };

  // Send the POST request with the form data
  xhr.send(formData);
});
