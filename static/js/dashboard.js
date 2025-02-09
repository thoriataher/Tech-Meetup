document.addEventListener('DOMContentLoaded', function () {
    const createEventBtn = document.getElementById('createEventBtn');
    const eventModal = document.getElementById('eventModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const eventForm = document.getElementById('eventForm');
    const eventsGrid = document.getElementById('eventsGrid');

    let isEditing = false;
    let currentEventCard = null;

    createEventBtn.addEventListener('click', function () {
        isEditing = false;
        eventForm.reset();
        eventModal.classList.add('active');
    });

    cancelBtn.addEventListener('click', function () {
        eventModal.classList.remove('active');
    });

    eventForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const logoUrl = document.getElementById('logoUrl').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const location = document.getElementById('location').value;
        const datetime = document.getElementById('datetime').value;
        const eventType = document.querySelector('input[name="eventType"]:checked').value;

        if (!logoUrl || !title || !description || !location || !datetime || !eventType) {
            alert('Please fill out all fields.');
            return;
        }

        if (isEditing && currentEventCard) {
            currentEventCard.querySelector('.company-card-logo img').src = logoUrl;
            currentEventCard.querySelector('.event-title').textContent = title;
            currentEventCard.querySelector('.event-type').textContent = eventType;
            currentEventCard.querySelector('.event-description').textContent = description;
            currentEventCard.querySelector('.event-location').textContent = location;
            currentEventCard.querySelector('.event-date').textContent = new Date(datetime).toLocaleString();
        } else {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
            <div class="event-header">
                <div class="company-card-logo">
                    <img src="${logoUrl}" alt="${title}">
                </div>
            </div>
            <div class="event-title-wrapper">
                <h3 class="event-title">${title}</h3>
                <span class="event-type">${eventType}</span>
            </div>
            <div>
                <p class="event-description">${description}</p>
                <div class="date-location-wrapper">
                <p class="event-location">${location}</p>
                <time class="event-date">${new Date(datetime).toLocaleString()}</time>
                </div>
            </div>
            <div class="event-actions">
                <button class="delete-button" id="delete-btn">Delete</button>
                <button class="edit-button">Edit</button>
            </div>`;

            eventsGrid.appendChild(eventCard);

            eventModal.classList.remove('active');
            eventForm.reset();

            const deleteButton = eventCard.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                eventsGrid.removeChild(eventCard);
            });
            const editButton = eventCard.querySelector('.edit-button');
            editButton.addEventListener('click', function () {
                isEditing = true;
                currentEventCard = eventCard;

                document.getElementById('logoUrl').value = eventCard.querySelector('.company-card-logo img').src;
                document.getElementById('title').value = eventCard.querySelector('.event-title').textContent;
                document.getElementById('description').value = eventCard.querySelector('.event-description').textContent;
                document.getElementById('location').value = eventCard.querySelector('.event-location').textContent;
                document.getElementById('datetime').value = new Date(eventCard.querySelector('.event-date').textContent).toISOString().slice(0, 16);
                document.querySelector(`input[name="eventType"][value="${eventCard.querySelector('.event-type').textContent}"]`).checked = true;

                eventModal.classList.add('active');
            });
        }
        eventModal.classList.remove('active');
        eventForm.reset();
    });
});