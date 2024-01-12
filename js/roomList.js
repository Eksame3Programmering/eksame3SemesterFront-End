document.addEventListener('DOMContentLoaded', function() {
    loadRooms();
});

function loadRooms() {
    fetch('http://localhost:8080/rooms')
        .then(response => response.json())
        .then(rooms => {
            displayRooms(rooms);
        })
        .catch(error => console.error(error));
}

function displayRooms(rooms) {
    var tableBody = document.getElementById('roomTableBody');
    tableBody.innerHTML = '';

    rooms.forEach(room => {
        var row = `<tr>
                <td>${room.id}</td>
                <td>${room.roomNumber}</td>
                <td>${room.numberOfBeds}</td>
                <td>${room.priceOfBeds}</td>
                <td>${room.hotel ? room.hotel.name : 'N/A'}</td> 
                <td> <button onclick="reserveRoom(${room.id})">Reserve</button></td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}

function reserveRoom(roomId) {
    window.location.href = `../html2/bookRoom.html?roomId=${roomId}`;
}