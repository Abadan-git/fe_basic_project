import fetchData from './modules/api.js';
import { API_URL, SELECTORS, errorImgUrl, catBreedsKey } from './modules/constants.js';
import CreateOption from './modules/CreateOption.js';
import CreateImage from './modules/CreateImage.js';
import { getFromLocalStorage, saveToLocalStorage } from './modules/localStorage.js';

// Function to populate the dropdown with cat breeds
async function getBreedArray() {
    const selectElement = document.getElementById(SELECTORS.friendsDropdown);
    const fragment = new DocumentFragment();

    let breeds = getFromLocalStorage(catBreedsKey);

    if (!breeds) {
        breeds = await fetchData(`${API_URL}/breeds`);
        saveToLocalStorage(catBreedsKey, breeds);
    }

    breeds.forEach(breed => {
        const option = new CreateOption(breed.id, breed.name);
        option.appendTo(fragment);
    });

    selectElement.appendChild(fragment);
}

// Function to open the popup with the selected breed’s image
async function openPopupWithImage(breedId) {
    const popup = document.getElementById(SELECTORS.popup);
    const imagesContainer = document.getElementById(SELECTORS.imagesContainer);

    popup.classList.remove('hidden');
    let imageUrl;

    try {
        imageUrl = await fetchCatImage(breedId);
    } catch (error) {
        console.error("Error fetching cat image:", error.message);
        imageUrl = errorImgUrl;
    }

    const imgElement = new CreateImage(imageUrl, 'Cat image');
    imgElement.appendTo(imagesContainer);
}

// Function to fetch an image of a specific breed
async function fetchCatImage(breedId) {
    const url = `${API_URL}/images/search?breed_ids=${breedId}`;

    const data = await fetchData(url);
    return data[0].url;
}

// Event listener for button click to open the popup with an image
const clickBtn = document.getElementById(SELECTORS.clickButton);
clickBtn.addEventListener('click', async () => {
    try {
        const breedId = document.getElementById(SELECTORS.friendsDropdown).value;
        await openPopupWithImage(breedId);
    } catch (error) {
        console.error("Error in openPopupWithImage:", error.message);
    }
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
try {
    await getBreedArray();
} catch (error) {
    console.error("Error populating dropdown:", error.message);
}
