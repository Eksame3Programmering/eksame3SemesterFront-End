var roomId = new URLSearchParams(window.location.search).get('roomId');
// Function to fetch hotel details for editing
function fetchHotelForUpdating() {
    // Get hotel ID from query parameter
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('id');

    // Fetch hotel data for editing
    fetch(`http://localhost:8080/hotels/${hotelId}`)
        .then(response => response.json())
        .then(hotel => {
            // Populate the edit form with hotel details
            document.getElementById('editName').value = hotel.name;
            document.getElementById('editStreet').value = hotel.street;
            document.getElementById('editCity').value = hotel.city;
            document.getElementById('editZip').value = hotel.zip;
            document.getElementById('editCountry').value = hotel.country;
        })
        .catch(error => {
            console.error('Error fetching hotel for editing:', error);
        });
}

// Function to update hotel details
function updateHotelDetails() {
    // Get hotel ID from query parameter
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('id');

    // Get values from the edit form
    const updatedHotel = {
        name: document.getElementById('editName').value,
        street: document.getElementById('editStreet').value,
        city: document.getElementById('editCity').value,
        zip: document.getElementById('editZip').value,
        country: document.getElementById('editCountry').value,
    };

    // Send a PUT request to update the hotel
    fetch(`http://localhost:8080/hotels/${hotelId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHotel),
    })
        .then(response => response.json())
        .then(updatedHotel => {
            console.log('Hotel updated successfully:', updatedHotel);
            // Redirect to the hotel list page after updating
            window.location.href = '../html/hotelsList.html';
        })
        .catch(error => {
            console.error('Error updating hotel:', error);
        });
}

// Fetch hotel details for editing when the page loads
document.addEventListener('DOMContentLoaded', fetchHotelForUpdating);

// Add submit event listener for the edit form
document.getElementById('editHotelForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Handle the form submission (send a PUT request to update the hotel)
    updateHotelDetails();
});