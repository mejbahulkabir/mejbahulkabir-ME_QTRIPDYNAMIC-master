
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(`Show LOG X${search}`)
var getCity = new URLSearchParams(`${search}`);
const city = getCity.get("city");

return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const encodedData = city;
  const firstDecode = decodeURIComponent(encodedData);
  const finalDecode = decodeURIComponent(firstDecode);
  const apiUrl = `${config.backendEndpoint}/adventures/?city=${finalDecode}`;

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

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
// function addAdventureToDOM(adventures) {
//   // TODO: MODULE_ADVENTURES
//   // 1. Populate the Adventure Cards and insert those details into the DOM

//   console.log("Updating Dom on", adventures);

//   if (adventures) {
//     document.querySelector("#data").innerHTML = "";
//     adventures.forEach((key) => {

//       document.querySelector("#data").innerHTML +=`
//         <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
//           <div class="card" style="width: 18rem;">
//             <div class="tile d-flex align-items-end">
//               <div class="tile-text">
//                 <div class="bg-warning" style="width:150px">${key.category}</div>
//               </div>
//               <img src="${key.image}" class="card-img-top" alt="..." style="height:180px">
//             </div>
//             <div class="card-body">
//               <div class="d-flex justify-content-between">
//                 <a href="#" class="card-link">${key.name}</a>
//                 <a href="#" class="card-link">${key.currency=="INR"? "₹" : key.currency} ${key.costPerHead}</a>
//               </div>
//               <div class="d-flex justify-content-between">
//                 <a href="#" class="card-link">Duration</a>
//                 <a href="#" class="card-link">${key.duration} h</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;

// //       const container=document.createElement("div");
// //       container.className="col-sm-12 col-md-6 col-lg-3"
// //       let innerHTML=`
// //       <div class="card" style="width: 18rem;">
// //       <div class="tile d-flex align-items-end">
     
// //       <div class="tile-text">
// //     <div class="bg-warning" style="width:150px">${key.category}</div>
// //     </div>
// //       <img src="${key.image}" class="card-img-top" alt="...">
// //       </div>
// //   <div class="card-body">
// //   <div class="d-flex justify-content-between">
// //     <a href="#" class="card-link">${key.name}</a>
// //     <a href="#" class="card-link">${key.currency=="INR"? "₹" : key.currency} ${key.costPerHead}</a>
// //   </div>
// //   <div class="d-flex justify-content-between">
// //   <a href="#" class="card-link">Duration</a>
// //   <a href="#" class="card-link">${key.duration} h</a>
// // </div>
// //   </div>
// // </div>`
      
// //     container.innerHTML = innerHTML;
    
// //      document.querySelector("#data").appendChild(container);
//     });
//   }

// }

 function addAdventureToDOM(adventures) {
  const dataElement = document.querySelector("#data");

  if (dataElement && adventures) {
    // Clear existing content
    dataElement.innerHTML = "";

    adventures.forEach((adventure) => {
      // Create a card for each adventure
      const card = document.createElement("div");
      card.className = "col-sm-12 col-md-6 col-lg-3 mb-2 activity-card";

      // Set card content
      card.innerHTML = `
        <div class="category-banner">${adventure.category}</div>
        <a id="${adventure.id}" href="./detail/?adventure=${adventure.id}">
          <img src="${adventure.image}" class="card-img-top" alt="${adventure.name}">
        </a>
        <div class="card-body">
          <h5 class="card-title">${adventure.name}</h5>
          <p class="card-text">
            <span>${adventure.currency === "INR" ? "₹" : adventure.currency}</span>
            ${adventure.costPerHead}
          </p>
          <p class="card-text">Duration: ${adventure.duration} h</p>
        </div>
      `;

      // Append the card to the data element
      dataElement.appendChild(card);
    });
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter(adventure => {
    const duration = adventure.duration;
    return duration >= low && duration <= high;
  });
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter(adventure => {
    const category = adventure.category;
    return categoryList.includes(category);
  });

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

// function filterFunction(list, filters) {
//   // TODO: MODULE_FILTERS
//   // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
//   // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
//   let filteredList = list;

//   console.log("Filter by", filters);
//   console.log("Filter on", list);

//   let filteredAdventures = [];
//   list.forEach(function(item, index) {
//     let filterFlag = true;
//     if(filters.category.length>0 ){
//       if(!filters.category.includes(item.category)){
//         filterFlag = false;
//       }
//     }

//     if(filters.duration.high>0){
//       if(!(item.duration>=filters.duration.low && item.duration<=filters.duration.high)){
//         filterFlag=false;
//       }
//     }

//     if(filterFlag){
//       filteredAdventures.push(item);
//     } 
//   });
//   console.log('Filtered Adventures:', filteredAdventures);

//   return filteredAdventures;
// }
function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  console.log("Filter by", filters);
  console.log("Filter on", list);

  // Check if filters are empty, return the original list if true
  if (!filters || (filters.category.length === 0 && filters.duration.low === 0 && filters.duration.high === 0)) {
    return list;
  }

  let filteredAdventures = list.filter((item) => {
    // Check for category filter
    const passesCategoryFilter = filters.category.length === 0 || filters.category.includes(item.category);

    // Check for duration filter
    const passesDurationFilter =
      filters.duration.high === 0 || (item.duration >= filters.duration.low && item.duration <= filters.duration.high);

    return passesCategoryFilter && passesDurationFilter;
  });

  console.log('Filtered Adventures:', filteredAdventures.map((a) => a.id));

  return filteredAdventures;
}

// function filterFunction(list, filters) {
//   // Check if filters are empty, return the original list if true
//   if (!filters || (filters.category.length === 0 && filters.duration === "")) {
//     return list;
//   }

//   // Parse the duration filter
//   const [lowDuration, highDuration] = filters.duration.split('-').map(Number);

//   // Filter the list based on category and duration filters
//   let filteredAdventures = list.filter((item) => {
//     // Check for category filter
//     const passesCategoryFilter = filters.category.length === 0 || filters.category.includes(item.category);

//     // Check for duration filter
//     const passesDurationFilter = filters.duration === "" ||
//       (lowDuration <= item.duration && item.duration <= highDuration);

//     return passesCategoryFilter && passesDurationFilter;
//   });

//   return filteredAdventures;
// }






//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  const storedFilters = localStorage.getItem('filters');
  return storedFilters ? JSON.parse(storedFilters) : null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById('category-list').value = `${filters.duration.low}-${filters.duration.high}`;
  const categoryPillsContainer = document.getElementById('category-list');

  // Clear existing pills
  categoryPillsContainer.innerHTML = "";

  // Generate and append new pills
  filters.category.forEach(category => {
    const pill = document.createElement('span');
    pill.className = 'category-pill';
    pill.textContent = category;
    categoryPillsContainer.appendChild(pill);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
