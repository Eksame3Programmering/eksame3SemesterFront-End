// Function to fetch hotels and populate the hotel dropdown
function fetchHotels() {
    fetch('http://localhost:8080/hotels')
        .then(response => response.json())
        .then(data => {
            const hotelDropdown = document.getElementById('hotelId');
            // Clear existing options
            hotelDropdown.innerHTML = '';

            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.text = 'Select a hotel';
            hotelDropdown.appendChild(defaultOption);

            // Add hotels to the dropdown
            data.forEach(hotel => {
                const option = document.createElement('option');
                option.value = hotel.id;
                option.text = hotel.name;
                hotelDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching hotels:', error);
        });
}

// Event listener for the create room button
document.getElementById('createRoomBtn').addEventListener('click', createRoom);

// Fetch hotels and populate the hotel dropdown on page load
fetchHotels();

// Function to create a room
function createRoom() {
    const roomNumber = document.getElementById('roomNumber').value;
    const numberOfBeds = document.getElementById('numberOfBeds').value;
    const hotelId = document.getElementById('hotelId').value;

    // Validate hotel selection
    if (!hotelId) {
        alert('Please select a hotel');
        return;
    }

    const roomData = {
        roomNumber: roomNumber,
        numberOfBeds: numberOfBeds,
        hotel: { id: hotelId }
    };

    // Send a POST request to create a room
    fetch('http://localhost:8080/rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
    })
        .then(response => response.json())
        .then(createdRoom => {
            console.log('Room created successfully:', createdRoom);
            alert('Room created successfully');
            // Optionally, redirect to a different page or update the UI
        })
        .catch(error => {
            console.error('Error creating room:', error);
            alert('Error creating room');
        });
}
