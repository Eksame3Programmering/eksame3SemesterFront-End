document.addEventListener('DOMContentLoaded', function() {
    const roomId = new URLSearchParams(window.location.search).get('roomId');
    const reservationForm = document.getElementById('reservationForm');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleReservationFormSubmission(roomId);
        });
    }
});

function handleReservationFormSubmission(roomId) {
    // Collect guest data from the form
    const guestData = {
        username: document.getElementById('guestUsername').value,
        firstName: document.getElementById('guestFirstName').value,
        lastName: document.getElementById('guestLastName').value,
        email: document.getElementById('guestEmail').value,
        phoneNumber: document.getElementById('guestPhoneNumber').value
        // Add more fields as needed
    };

    // Create the guest first
    fetch('http://localhost:8080/guests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guestData)
    })
        .then(response => response.json())
        .then(createdGuest => {
            // Guest created, proceed to create reservation
            createReservation(createdGuest.id, roomId);
        })
        .catch(error => console.error(error));
}

function createReservation(guestId, roomId) {
    // Create the reservation
    fetch('http://localhost:8080/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            room: { id: roomId },
            guest: { id: guestId },
            reservationDate: new Date().toISOString()
            // Add more reservation details as needed
        })
    })
        .then(response => response.json())
        .then(createdReservation => {
            alert('Room reserved successfully!');
            // Redirect the user to another page
            window.location.href = `../html/roomList.html`;
        })
        .catch(error => console.error(error));
}
