// Fetch hotels and update the table
fetch('http://localhost:8080/hotels') // Replace with your actual backend URL
    .then(response => response.json())
    .then(data => {
        const hotelTableBody = document.getElementById('hotelTableBody');

        // Clear any existing table rows
        hotelTableBody.innerHTML = '';

        // Loop through the hotels and create table rows
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
          `;
            hotelTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching hotels:', error);
    });