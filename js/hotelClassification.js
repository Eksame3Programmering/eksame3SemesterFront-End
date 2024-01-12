// script.js

function getHotelsByType() {
    const selectedType = document.getElementById('typeAnnotation').value;

    fetch(`http://localhost:8080/hotels/byTypeAnnotations/${selectedType}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayHotels(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Handle errors as needed
        });
}

function displayHotels(hotels) {
    const hotelListContainer = document.getElementById('hotelList');
    hotelListContainer.innerHTML = '';

    if (hotels.length === 0) {
        hotelListContainer.innerHTML = '<p>No hotels found.</p>';
        return;
    }

    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    hotels.forEach(hotel => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${hotel.name} - ${hotel.city}, ${hotel.country} (${hotel.typeAnnotations})`;
        ul.appendChild(li);
    });

    hotelListContainer.appendChild(ul);
}
