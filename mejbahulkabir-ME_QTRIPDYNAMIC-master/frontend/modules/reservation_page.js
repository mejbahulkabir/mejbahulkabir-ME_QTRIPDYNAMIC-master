import config from "../conf/index.js";

async function fetchReservations() {
  try {
    const response = await fetch(`${config.backendEndpoint}/reservations`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return null;
  }
}


function addReservationToTable(reservations) {
  const reservationTableParent = document.getElementById('reservation-table-parent');
  const noReservationBanner = document.getElementById('no-reservation-banner');
  const reservationTable = document.getElementById('reservation-table');
  const tbody = document.querySelector('tbody');

  if (!reservationTableParent || !noReservationBanner || !reservationTable || !tbody) {
    console.error('One or more required elements not found.');
    return;
  }

  if (reservations.length === 0) {
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";  // Set display style to 'none'
    return;
  } else {
    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";  // Set display style to 'block'
  }
  tbody.innerHTML = 'none';
  reservations.forEach(reservation => {
    const row = tbody.insertRow();
    const date = new Date(reservation.date);
    const time = new Date(reservation.time);

        const formattedDateX = date.toLocaleDateString('en-IN');
    

// Format the date
const formattedDate = time.toLocaleDateString('en-IN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const formattedTime = time.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
},).replace(/\b([AP]M)\b/, (match) => match.toLowerCase());

        // Example of displaying formatted date and time
        

    const transactionIdCell = row.insertCell(0);
    transactionIdCell.textContent = reservation.id;

    const bookingNameCell = row.insertCell(1);
    bookingNameCell.textContent = reservation.name;

    const adventureCell = row.insertCell(2);
    adventureCell.textContent = reservation.adventureName;

    const personsCell = row.insertCell(3);
    personsCell.textContent = reservation.person;

    const dateCell = row.insertCell(4);
    dateCell.textContent = `${formattedDateX}`;

    const priceCell = row.insertCell(5);
    priceCell.textContent = reservation.price;

    const bookingTimeCell = row.insertCell(6);
    bookingTimeCell.textContent = `${formattedDate}, ${formattedTime}`;

    const actionCell = row.insertCell(7);
    actionCell.setAttribute("id",reservation.id);
    const visitButton = document.createElement('a');
    visitButton.classList.add('reservation-visit-button');
    visitButton.textContent = 'Visit';
    visitButton.href = `../detail/?adventure=${reservation.adventure}`;
    actionCell.appendChild(visitButton);
  });
}


export { fetchReservations, addReservationToTable };
