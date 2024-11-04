const catBubble = document.getElementById('catBubble');
const catNameLogo = document.getElementById('catNameLogo');
const catHugImg = document.getElementById('catHugImg');
const catHealthImg = document.getElementById('catHealthImg');
const catDietImg = document.getElementById('catDietImg');
const catGalleryImg = document.getElementById('catGalleryImg');
const fewWords = document.getElementById('clickBtn');
const catImg = document.getElementById('catImg');
const catContainer = document.getElementById('catContainer');
const clickBtn = document.getElementById('clickBtn');
const popup = document.getElementById('popup');
const imagesContainer = document.getElementById('imagesContainer');

const updateElement = (element, { text = null, color = null, image = null, html = null } = {}) => {
  if (text !== null) element.textContent = text;
  if (color !== null) element.style.color = color;
  if (image !== null) element.src = image;
  if (html !== null) element.innerHTML = html;
};


const handleHover = (element, { hoverText = null, leaveText = null, hoverColor = null, leaveColor = null, hoverImage = null, leaveImage = null } = {}) => {
  element.addEventListener('mouseenter', () => {
    updateElement(element, { text: hoverText, color: hoverColor, image: hoverImage });
  });
  element.addEventListener('mouseleave', () => {
    updateElement(element, { text: leaveText, color: leaveColor, image: leaveImage });
  });
};

handleHover(catBubble, { hoverText: 'Meowww', leaveText: 'Pet me' });
handleHover(catNameLogo, { hoverText: 'MY BABY', leaveText: 'SOLOMON', hoverColor: '#6ED5DB', leaveColor: 'black' });
handleHover(catHugImg, { hoverImage: 'images/index_images/cat_hug.gif', leaveImage: 'images/index_images/cat_hug.png' });
handleHover(catHealthImg, { hoverImage: 'images/index_images/cat_health.gif', leaveImage: 'images/index_images/cat_health.png' });
handleHover(catDietImg, { hoverImage: 'images/index_images/cat_diet.gif', leaveImage: 'images/index_images/cat_diet.png' });
handleHover(catGalleryImg, { hoverImage: 'images/index_images/cat_gallery.gif', leaveImage: 'images/index_images/cat_gallery.png' });



function createOrGetMessage(elem, html) {
  let existingMessage = document.getElementById('center-message');


  if (!existingMessage) {
    let message = document.createElement('div');
    message.id = 'center-message';

    message.style.cssText = `
      font-size: 36px;
      margin: 20px 0 10px;
      background: linear-gradient(135deg, #6ED5DB, #67A6E8);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      position: absolute;  
      padding: 5px; 
      z-index: 10000; 
      text-align: center;
    `;

    message.innerHTML = html;
    catContainer.append(message);


    const messageWidth = message.offsetWidth;
    const messageHeight = message.offsetHeight;


    const coords = elem.getBoundingClientRect();
    const imgCenterX = coords.width / 2;
    const imgCenterY = coords.height / 2;


    message.style.left = imgCenterX - (messageWidth / 2) + "px";
    message.style.top = imgCenterY - (messageHeight / 2) + "px";

    return message;
  } else {

    existingMessage.innerHTML = html;
    return existingMessage;
  }
}


catImg.addEventListener('click', () => {

  const message = createOrGetMessage(catContainer, 'Hello, world!');


  setTimeout(() => {
    message.remove();
  }, 2000);
});


function fetchCatImage() {
  const errorImgUrl = 'https://t3.ftcdn.net/jpg/05/08/67/42/360_F_508674247_d8JegDh7o9yJmYcae2jdEpsQ9LVmiXDM.jpg';

  return fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => data[0].url)
        .catch(error => {
          console.error('Error fetching cat image:', error);
          return errorImgUrl;
        });
}

async function openPopupWithImage() {
  popup.classList.remove('hidden');

  const imageUrl = await fetchCatImage();
  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.width = '100%';
  img.style.height = '80vh';
  imagesContainer.appendChild(img);
}

clickBtn.addEventListener('click', openPopupWithImage);

popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.classList.add('hidden');
    imagesContainer.innerHTML = '';
  }
});
