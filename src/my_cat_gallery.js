(function () {
    const API_KEY = 'live_wLRK4FXcC44BVnuVXjIPuXo3W3ddMYQlNwySLjQu7z1Vm94HmVnQhf9tC8LaOlxB';
    const API_URL = 'https://api.thecatapi.com/v1/images';
    const ITEMS_PER_PAGE = 50;

    // Set up form submission listener for image upload
    document.getElementById('uploadForm').addEventListener('submit', handleUploadSubmit);

    // Function to handle the image upload process
    async function handleUploadSubmit(event) {
        event.preventDefault();

        const fileInput = document.getElementById('fileInput');
        const uploadMessage = document.getElementById('uploadMessage');

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {

            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                headers: {
                    'x-api-key': API_KEY
                },
                body: formData
            });

            const responseData = await response.text();


            if (response.ok) {
                uploadMessage.textContent = 'Image uploaded successfully!';
                await fetchImages();
            } else if (responseData.includes("Classifcation failed: correct animal not found.")) {
                uploadMessage.textContent = 'You can upload images only with cats';
            } else {
                uploadMessage.textContent = `Error: ${responseData}`;
            }

        } catch (error) {
            console.error(error);
            uploadMessage.textContent = `Upload failed: ${error.message}`;
        }
    }

    // Function to fetch and display images from the API
    async function fetchImages() {
        const gallery = document.getElementById('gallery');
        const errorMessage = document.getElementById('errorMessage');

        gallery.innerHTML = '';

        try {

            const response = await fetch(`${API_URL}?limit=${ITEMS_PER_PAGE}&order=DESC`, {
                headers: {
                    'x-api-key': API_KEY
                }
            });

            if (response.ok) {
                const images = await response.json();


                images.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = image.url;
                    imgElement.alt = 'Cat Image';
                    gallery.appendChild(imgElement);
                });
            } else {
                errorMessage.textContent = `Error fetching images: ${response.statusText}`;
            }
        } catch (error) {
            console.error(error);
            errorMessage.textContent = `Failed to load images: ${error.message}`;
        }
    }

    // Display images when the page loads
    fetchImages();

})();
