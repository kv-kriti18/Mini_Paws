// Create data object for the POST request
const postData = {
    name: 'John Doe',
    email: 'johndoe@example.com'
  };
  
  // Fetch POST request to send data
  fetch('https://example.com/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to post data');
      }
    })
    .then(data => {
      console.log('Data received from backend:', data);
      // Handle the received data here
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
  