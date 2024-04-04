import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  var getAdventure = new URLSearchParams(`${search}`);
  const adventureId = getAdventure.get("adventure");
  


  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const apiUrl = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Data for cities:', data);
    return data;
   
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
// Updated addAdventureDetailsToDOM function with integrated Bootstrap carousel
function addAdventureDetailsToDOM(adventure) {
  const adventureNameElement = document.getElementById('adventure-name');
  const adventureSubtitleElement = document.getElementById('adventure-subtitle');
  const adventureContentElement = document.getElementById('adventure-content');
  const photoGalleryElement = document.getElementById('photo-gallery');

  // Populate name, subtitle, and content
  adventureNameElement.textContent = adventure.name;
  adventureSubtitleElement.textContent = adventure.subtitle;
  adventureContentElement.textContent = adventure.content;

  // Clear existing content in photo-gallery
  photoGalleryElement.innerHTML = '';

  // Loop through images and create div elements for each
  adventure.images.forEach(imageUrl => {
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('activity-card-image');

      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;

      // Apply additional styles for fixed height and width
      imageElement.style.height = '300px'; // Set fixed height
      imageElement.style.width = '100%'; // Set width to 100% for responsiveness

      imageDiv.appendChild(imageElement);
      photoGalleryElement.appendChild(imageDiv);
  });
}

// Updated addBootstrapPhotoGallery function with integrated Bootstrap carousel
// Updated addBootstrapPhotoGallery function with integrated Bootstrap carousel and arrow controls
function addBootstrapPhotoGallery(images) {
  const photoGalleryElement = document.getElementById('photo-gallery');
  photoGalleryElement.innerHTML = ''; // Clear existing content in photo-gallery

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel', 'slide');
  carouselContainer.setAttribute('id', 'carouselExampleIndicators');
  carouselContainer.setAttribute('data-bs-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  images.forEach((_, index) => {
      const indicator = document.createElement('li');
      indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
      indicator.setAttribute('data-bs-slide-to', index.toString());
      if (index === 0) {
          indicator.classList.add('active');
      }
      carouselIndicators.appendChild(indicator);
  });

  carouselContainer.appendChild(carouselIndicators);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');
  images.forEach((imageUrl, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
          carouselItem.classList.add('active');
      }

      const imageElement = document.createElement('img');
      imageElement.classList.add('d-block', 'w-100');
      imageElement.style.maxHeight = '600px'; // Set maximum height
      imageElement.style.width = '100%';
      imageElement.src = imageUrl;

      carouselItem.appendChild(imageElement);
      carouselInner.appendChild(carouselItem);
  });

  carouselContainer.appendChild(carouselInner);

  // Create left and right arrow controls
  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#carouselExampleIndicators';
  prevControl.setAttribute('role', 'button');
  prevControl.setAttribute('data-bs-slide', 'prev');
  prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
  
  const nextControl = document.createElement('a');
  nextControl.classList.add('carousel-control-next');
  nextControl.href = '#carouselExampleIndicators';
  nextControl.setAttribute('role', 'button');
  nextControl.setAttribute('data-bs-slide', 'next');
  nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span>';

  carouselContainer.appendChild(prevControl);
  carouselContainer.appendChild(nextControl);

  photoGalleryElement.appendChild(carouselContainer);
}



//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  const reservationAvailablePanel = document.getElementById('reservation-panel-available');
  const reservationSoldOutPanel = document.getElementById('reservation-panel-sold-out');
  const costPerHeadElement = document.getElementById('reservation-person-cost');

  if (adventure.available) {
    // Adventure is available
    reservationAvailablePanel.style.display = 'block';
    reservationSoldOutPanel.style.display = 'none';
    costPerHeadElement.textContent = `${adventure.costPerHead}`;
  } else {
    // Adventure is not available (sold out)
    reservationAvailablePanel.style.display = 'none';
    reservationSoldOutPanel.style.display = 'block';
  }
}


//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  const totalCostElement = document.getElementById('reservation-cost');
  
  // Calculate the total cost based on the number of persons and the cost per head
  const totalCost = persons * adventure.costPerHead;

  // Update the DOM to show the total cost
  totalCostElement.textContent = `${totalCost}`;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  console.log(`Show ADV ID:${adventure.toString}`);
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    // Capture form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const date = formData.get('date');
    const persons = formData.get('person');
    const adventureId = adventure['id'];
  
  
    const postData = {
      name,
      date,
      person: parseInt(persons),
      adventure: adventureId
    };
  
  
    try {
      const response = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      alert('Success!'); 
      window.location.reload(); 
    } catch (error) {
      console.error('Error:', error);
      alert('Failed!');
    }
  });
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById('reserved-banner');
  reservedBanner.style.display = adventure.reserved ? 'block' : 'none';

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
