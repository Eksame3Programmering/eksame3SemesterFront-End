function getAllRoomsInHotel() {
    // Get the hotelId from the input field
    const hotelId = document.getElementById('hotelId').value;

    // Check if the hotelId is not empty
    if (hotelId.trim() !== '') {
        fetch(`http://localhost:8080/rooms/hotels/${hotelId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Room fetch failed with status: ${response.status}. ${response.statusText}`);
                }
                return response.json();
            })
            .then(rooms => {
                // Check if there are rooms
                if (rooms.length === 0) {
                    console.log('No rooms available for the specified hotel.');
                } else {
                    // Call a function to display or process the rooms as needed
                    displayRooms(rooms);
                }
            })
            .catch(error => {
                console.error("Room Fetch Error:", error);
                // Inform the user about the error
                alert(`Error fetching rooms: ${error.message}`);
            });
    } else {
        console.error('Hotel ID cannot be empty');
        // Inform the user about the empty hotel ID
        alert('Hotel ID cannot be empty');
    }
}

function displayRooms(rooms) {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = ''; // Clear previous content

    rooms.forEach(room => {
        const listItem = document.createElement('li');
        listItem.textContent = `Room ID: ${room.id}, Room Number: ${room.roomNumber}`;
        roomList.appendChild(listItem);
    });
}
