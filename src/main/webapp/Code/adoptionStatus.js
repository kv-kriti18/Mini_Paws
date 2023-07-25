// Fetch adoption status from URL
function getAdoptionStatus() {
    // Replace 'https://example.com/adoption/status' with the actual URL
    return fetch('https://example.com/adoption/status')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch adoption status');
        }
      })
      .catch(error => {
        console.error('Error fetching adoption status:', error);
      });
  }
  
  // Usage:
  getAdoptionStatus()
    .then(status => {
      // Handle the adoption status here
      console.log('Adoption status:', status);
    });
  