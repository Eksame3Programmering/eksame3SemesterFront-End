document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display reservations
    fetchReservations();
});

function displayReservations(reservations) {
    const reservationList = document.getElementById('reservationList');

    // Check if there are reservations
    if (reservations.length === 0) {
        reservationList.innerHTML = '<p>No reservations available.</p>';
    } else {
        // Create an HTML table of reservations
        const table = createReservationsTable(reservations);
        reservationList.innerHTML = '';
        reservationList.appendChild(table);
    }
}

function createReservationsTable(reservations) {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Number of Days</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    reservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.id}</td>
            <td>${reservation.numberOfDays}</td>
            <td>${reservation.created}</td>
            <td>${reservation.updated}</td>
            <td>
                <button onclick="deleteReservation(${reservation.id})">Delete</button>
            </td>
        `;
        table.querySelector('tbody').appendChild(row);
    });

    return table;
}

function deleteReservation(reservationId) {
    // Confirm deletion with the user (optional)
    const confirmDeletion = confirm('Are you sure you want to delete this reservation?');

    if (confirmDeletion) {
        // Send DELETE request to the server
        fetch(`http://localhost:8080/reservations/${reservationId}`, {
            method: 'DELETE'
        })
            .then(handleResponse)
            .then(deletedReservation => {
                alert('Reservation deleted successfully!');
                // Refresh the reservation list
                fetchReservations();
            })
            .catch(handleError);
    }
}

function fetchReservations() {
    // Fetch and display reservations
    fetch('http://localhost:8080/reservations')
        .then(handleResponse)
        .then(displayReservations)
        .catch(handleError);
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}. ${response.statusText}`);
    }

    // Check if the response body is empty
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        // If the response is not JSON, return null or handle as needed
        return null;
    }

    // Parse and return the JSON response
    return response.json();
}

function handleError(error) {
    console.error("Error:", error);
    // Handle errors as needed (e.g., show an error message to the user)
}
