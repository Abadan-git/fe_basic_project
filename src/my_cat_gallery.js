import  fetchData from './modules/api.js';
import {API_KEY, API_URL, SELECTORS} from './modules/constants.js';
import {createImage} from './modules/createElement.js';


// Function to fetch and display images from the API
async function loadGalleryImages() {
    const galleryElement = document.getElementById(SELECTORS.gallery);
    const errorMessage = document.getElementById(SELECTORS.errorMessage);
    const fragment = new DocumentFragment();

    try {
        const options = {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            }
        };
        const images = await fetchData(`${API_URL}/images?limit=50&order=DESC`, options);
        images.forEach(image => {
            const imgElement = createImage({image, alt: 'Cat photo'});
            fragment.append(imgElement);
        });

        galleryElement.append(fragment);
    } catch (error) {
        console.error(error);
        errorMessage.textContent = 'Failed to load images';
    }
}

// Function to add uploaded image to the gallery
async function addNewGalleryImage() {
    const galleryElement = document.getElementById(SELECTORS.gallery);
    const errorMessage = document.getElementById(SELECTORS.errorMessage);


    try {
        const options = {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            }
        };
        const images = await fetchData(`${API_URL}/images?limit=50&order=DESC`, options);
        const image = images && images.length && images[0];
        const imgElement = createImage({image, alt: 'Cat photo'});

        galleryElement.prepend(imgElement);
    } catch (error) {
        console.error(error);
        errorMessage.textContent = 'Failed to load images';
    }
}


// Function to handle the image upload process
async function handleUpload(event) {
    event.preventDefault();
    const uploadMessage = document.getElementById(SELECTORS.uploadMessage);
    const formData = new FormData(event.target);

    formData.append('file', event.target.elements.fileInput.files[0]);

    try {
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
    } catch (error) {
        if (error.message.includes("Unexpected token 'C'")) {
            uploadMessage.textContent = 'You can upload images only with cats';
        } else {
            uploadMessage.textContent = `Upload failed: ${error.message}`;
            console.error("Error in handleUpload:", error);
        }
    }
}

// Display images when the page loads
loadGalleryImages();

// Set up form submission listener for image upload
const uploadForm = document.getElementById(SELECTORS.uploadForm);
uploadForm.addEventListener('submit', handleUpload);

