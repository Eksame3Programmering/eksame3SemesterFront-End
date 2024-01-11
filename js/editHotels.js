// Fetch hotels and update the table
function fetchAndRenderHotels() {
    fetch('http://localhost:8080/hotels')
        .then(response => response.json())
        .then(data => {
            const hotelTableBody = document.getElementById('hotelTableBody');
            hotelTableBody.innerHTML = '';

            data.forEach(hotel => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${hotel.id}</td>
          <td>${hotel.name}</td>
          <td>${hotel.street}</td>
          <td>${hotel.city}</td>
          <td>${hotel.zip}</td>
          <td>${hotel.country}</td>
          <td>${hotel.rooms}</td>
          <td><button class="btn btn-danger" onclick="deleteHotel(${hotel.id})">Delete</button></td> <!-- Add this line for the delete button -->
        `;
                hotelTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching hotels:', error);
        });
}

function deleteHotel(hotelId) {
    // Send a DELETE request to the backend API to delete the hotel
    fetch(`http://localhost:8080/hotels/${hotelId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete hotel with ID ${hotelId}`);
            }
            console.log(`Hotel with ID ${hotelId} deleted successfully`);
            // Update the table with the latest data
            fetchAndRenderHotels();
        })
        .catch(error => {
            console.error('Error deleting hotel:', error);
        });
}

document.getElementById('createHotelBtn').addEventListener('click', function () {
    const hotelName = document.getElementById('hotelName').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;

    console.log('Form values:', hotelName, street, city, zip, country);

    // Example: Use the fetch API to send a POST request to the backend
    fetch('http://localhost:8080/hotels', {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            name: hotelName, street: street, city: city, zip: zip, country: country
        }),
    })
        .then(response => response.json())
        .then(createdHotel => {
            console.log('Hotel created successfully:', createdHotel);

            // Update the table with the new hotel
            fetchAndRenderHotels();
        })
        .catch(error => {
            console.error('Error creating hotel:', error);
        });
});

// Fetch and render hotels when the page loads
document.addEventListener('DOMContentLoaded', fetchAndRenderHotels);
