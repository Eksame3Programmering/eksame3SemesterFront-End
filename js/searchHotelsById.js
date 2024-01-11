function searchHotelById() {
    const hotelId = document.getElementById('hotelId').value;

    // Fetch hotel details by ID
    fetch(`http://localhost:8080/hotels/${hotelId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Hotel with ID ${hotelId} not found`);
            }
            return response.json();
        })
        .then(hotel => {
            // Display hotel details
            const hotelDetailsDiv = document.getElementById('hotelDetails');
            hotelDetailsDiv.innerHTML = `
                <h3>Hotel Details</h3>
                <p>ID: ${hotel.id}</p>
                <p>Name: ${hotel.name}</p>
                <p>Street: ${hotel.street}</p>
                <p>City: ${hotel.city}</p>
                <p>ZIP: ${hotel.zip}</p>
                <p>Country: ${hotel.country}</p>
                <p>Room Count: ${hotel.rooms}</p>
            `;
        })
        .catch(error => {
            // Display error message
            const hotelDetailsDiv = document.getElementById('hotelDetails');
            hotelDetailsDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
        });
}

// Event listener for the search button
document.getElementById('searchHotelBtn').addEventListener('click', searchHotelById);