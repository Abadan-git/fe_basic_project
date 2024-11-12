(function () {
    const selectElement = document.getElementById('friends');
    const clickBtn = document.getElementById('clickBtn');
    const popup = document.getElementById('popup');
    const imagesContainer = document.getElementById('imagesContainer');

    // Function to make API requests
    async function getData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(error.message);
            return error;
        }
    }

    // Function to populate the dropdown with cat breeds
    const getBreedArray = async () => {
        const url = 'https://api.thecatapi.com/v1/breeds';
        try {
            const breedArray = await getData(url);
            breedArray.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed.id;
                option.innerText = breed.name;
                selectElement.appendChild(option);
            });
        } catch (error) {
            console.error("Failed to create option:", error.message);
        }
    };

    // Function to fetch an image of a specific breed
    async function fetchCatImage(breedId) {
        const errorImgUrl = 'https://t3.ftcdn.net/jpg/05/08/67/42/360_F_508674247_d8JegDh7o9yJmYcae2jdEpsQ9LVmiXDM.jpg'; // Default image if request fails
        const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

        try {
            const data = await getData(url);
            return data[0].url;
        } catch (error) {
            return errorImgUrl;
        }
    }

    // Function to open the popup with the selected breed’s image
    async function openPopupWithImage() {
        const selectedBreedId = selectElement.value;

        popup.classList.remove('hidden');
        const imageUrl = await fetchCatImage(selectedBreedId);
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.width = '100%';
        img.style.height = '80vh';
        imagesContainer.appendChild(img);
    }

    // Event listener for button click to open the popup with an image
    clickBtn.addEventListener('click', openPopupWithImage);

    // Event listener to close the popup when clicking outside the image
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.add('hidden');
            imagesContainer.innerHTML = '';
        }
    });

    // Populate the dropdown with breeds when the page loads
    getBreedArray();
})();
