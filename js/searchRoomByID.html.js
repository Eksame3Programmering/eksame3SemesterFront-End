function searchRoom() {
    const roomId = document.getElementById('roomId').value;

    if (roomId.trim() !== '') {
        fetch(`http://localhost:8080/rooms/${roomId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Room fetch failed with status: ${response.status}. ${response.statusText}`);
                }
                return response.json();
            })
            .then(room => {
                displayRoomDetails(room);
            })
            .catch(error => {
                console.error("Room Fetch Error:", error);
                displayErrorMessage('Room not found');
            });
    } else {
        displayErrorMessage('Please enter Room ID');
    }
}

function displayRoomDetails(room) {
    const roomDetailsDiv = document.getElementById('roomDetails');
    roomDetailsDiv.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = `Room ID: ${room.id}`;

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = `Room Number: ${room.roomNumber}\nNumber of Beds: ${room.numberOfBeds}\nPrice of Beds: ${room.priceOfBeds}`;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);

    roomDetailsDiv.appendChild(card);
}

function displayErrorMessage(message) {
    const roomDetailsDiv = document.getElementById('roomDetails');
    roomDetailsDiv.innerHTML = `<p class="text-danger">${message}</p>`;
}
