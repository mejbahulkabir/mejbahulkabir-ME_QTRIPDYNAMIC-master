import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const apiUrl = `${config.backendEndpoint}/cities`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }

}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // Create container div for the city card
  const container = document.createElement("div");
  container.className = "col-sm-12 col-md-6 col-lg-3";
  const innerHTML = `
    <div class="tile">
      <div class="tile-text text-center">
        <a class="nav-link" id="${id}" href="./pages/adventures/?city=${id}">
          <h3>${city}</h3>
          <p>${description}</p>
        </a>
      </div>
      <a class="tile" href="./pages/adventures/?city=${id}">
        <img src="${image}" alt="${city} Image">
      </a>
    </div>
  `;

  // Set inner HTML of the container
  container.innerHTML = innerHTML;

  // Append the container to the element with ID "data"
  const dataElement = document.querySelector("#data");
  if (dataElement) {
    dataElement.appendChild(container);
  } else {
    console.error('Error: Element with ID "data" not found');
  }
}


export { init, fetchCities, addCityToDOM };
