import fetchData from './modules/api.js';
import {API_KEY, API_URL, SELECTORS} from './modules/constants.js';
import CreateImage from './modules/CreateImage.js';

// Function to fetch and display images from the API
async function loadGalleryImages() {
    const galleryElement = document.getElementById(SELECTORS.gallery);
    const fragment = new DocumentFragment();

    const options = {
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
        }
    };

    const images = await fetchData(`${API_URL}/images?limit=50&order=DESC`, options);
    images.forEach(image => {
        const imgElement = new CreateImage(image.url, 'Cat photo', {
            className: 'gallery-image',
            'data-id': image.id
        });
        imgElement.appendTo(fragment);
    });

    galleryElement.appendChild(fragment);
}

// Function to add uploaded image to the gallery
async function addNewGalleryImage() {
    const galleryElement = document.getElementById(SELECTORS.gallery);

    const options = {
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
        }
    };

    const images = await fetchData(`${API_URL}/images?limit=1&order=DESC`, options);
    const image = images && images.length && images[0];
    const imgElement = new CreateImage(image.url, 'Cat photo');
    galleryElement.prepend(imgElement.getElement());
}

// Function to handle the image upload process
async function handleUpload(event) {
    event.preventDefault();
    const uploadMessage = document.getElementById(SELECTORS.uploadMessage);
    const formData = new FormData(event.target);

    formData.append('file', event.target.elements.fileInput.files[0]);

    const options = {
        method: 'POST',
        body: formData,
        headers: {
            'x-api-key': API_KEY,
        }
    };

    const response = await fetchData(`${API_URL}/images/upload`, options);

    if (response) {
        uploadMessage.textContent = 'Image uploaded successfully!';
        await addNewGalleryImage();
    }
}

// Display images when the page loads
try {
    await loadGalleryImages();
} catch (error) {
    const errorMessage = document.getElementById(SELECTORS.errorMessage);
    errorMessage.textContent = `Failed to load images: ${error.message}`;
    console.error("Error in loadGalleryImages:", error);
}

// Set up form submission listener for image upload
const uploadForm = document.getElementById(SELECTORS.uploadForm);
uploadForm.addEventListener('submit', async (event) => {
    try {
        await handleUpload(event);
    } catch (error) {
        const uploadMessage = document.getElementById(SELECTORS.uploadMessage);
        uploadMessage.textContent = `Upload failed: ${error.message}`;
        console.error("Error in handleUpload:", error);
    }
})