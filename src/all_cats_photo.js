import fetchData from './modules/api.js';
import { API_URL, SELECTORS, errorImgUrl, catBreedsKey } from './modules/constants.js';
import {createOption} from './modules/createElement.js';
import { getFromLocalStorage, saveToLocalStorage } from './modules/localStorage.js';

// Function to populate the dropdown with cat breeds
async function getBreedArray() {
    const selectElement = document.getElementById(SELECTORS.friendsDropdown);
    const fragment = new DocumentFragment();

    try {
        let breeds = getFromLocalStorage(catBreedsKey);

        if (!breeds) {
            breeds = await fetchData(`${API_URL}/breeds`);
            saveToLocalStorage(catBreedsKey, breeds);
        }

        breeds.forEach(breed => {
            const option = createOption(breed);
            fragment.append(option);
        });

        selectElement.append(fragment);
    } catch (error) {
        console.error("Failed to create option:", error.message);
    }
}

// Function to open the popup with the selected breed’s image
async function openPopupWithImage(breedId) {
    const popup = document.getElementById(SELECTORS.popup);
    const imagesContainer = document.getElementById(SELECTORS.imagesContainer);

    popup.classList.remove('hidden');
    const imageUrl = await fetchCatImage(breedId);
    const img = document.createElement('img');
    img.src = imageUrl;

    imagesContainer.appendChild(img);
}

// Function to fetch an image of a specific breed
async function fetchCatImage(breedId) {
    const url = `${API_URL}/images/search?breed_ids=${breedId}`;
    try {
        const data = await fetchData(url);
        return data[0].url;
    } catch (error) {
        console.error("Error fetching cat image:", error.message);
        return errorImgUrl;
    }
}

// Event listener for button click to open the popup with an image
const clickBtn = document.getElementById(SELECTORS.clickButton);
clickBtn.addEventListener('click', () => {
    const breedId = document.getElementById(SELECTORS.friendsDropdown).value;
    openPopupWithImage(breedId);
});

// Event listener to close the popup when clicking outside the image
const popup = document.getElementById(SELECTORS.popup);
const imagesContainer = document.getElementById(SELECTORS.imagesContainer);

popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.classList.add('hidden');
        imagesContainer.innerHTML = '';
    }
});

// Populate the dropdown with breeds when the page loads
getBreedArray();
