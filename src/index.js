import { SELECTORS } from './modules/constants.js';
import CreateDiv from './modules/CreateDiv.js';

document.addEventListener('DOMContentLoaded', () => {
  const catBubble = document.getElementById(SELECTORS.catBubble);
  const catNameLogo = document.getElementById(SELECTORS.catNameLogo);
  const catHugImg = document.getElementById(SELECTORS.catHugImg);
  const catHealthImg = document.getElementById(SELECTORS.catHealthImg);
  const catDietImg = document.getElementById(SELECTORS.catDietImg);
  const catGalleryImg = document.getElementById(SELECTORS.catGalleryImg);
  const catImg = document.getElementById(SELECTORS.catImg);
  const catContainer = document.getElementById(SELECTORS.catContainer);

  // Function to update an element’s properties
  const updateElement = (element, { text = null, color = null, image = null } = {}) => {
    if (text !== null) element.textContent = text;
    if (color !== null) element.style.color = color;
    if (image !== null) element.src = image;
  };

  // Function to handle hover effects on elements
  const handleHover = (element, options) => {
    element.addEventListener('mouseenter', () => updateElement(element, options.hover));
    element.addEventListener('mouseleave', () => updateElement(element, options.leave));
  };

  // Set hover effects on various elements with the `handleHover` function
  handleHover(catBubble, { hover: { text: 'Meowww' }, leave: { text: 'Pet me' } });
  handleHover(catNameLogo, { hover: { text: 'MY BABY', color: '#6ED5DB' }, leave: { text: 'SOLOMON', color: 'black' } });
  handleHover(catHugImg, { hover: { image: 'images/index_images/cat_hug.gif' }, leave: { image: 'images/index_images/cat_hug.png' } });
  handleHover(catHealthImg, { hover: { image: 'images/index_images/cat_health.gif' }, leave: { image: 'images/index_images/cat_health.png' } });
  handleHover(catDietImg, { hover: { image: 'images/index_images/cat_diet.gif' }, leave: { image: 'images/index_images/cat_diet.png' } });
  handleHover(catGalleryImg, { hover: { image: 'images/index_images/cat_gallery.gif' }, leave: { image: 'images/index_images/cat_gallery.png' } });

  // Function to center an element within a target container
  const centerElement = (element, target) => {
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    const coords = target.getBoundingClientRect();
    const targetCenterX = coords.width / 2;
    const targetCenterY = coords.height / 2;

    // Center the element relative to the target
    element.style.left = `${targetCenterX - (elementWidth / 2)}px`;
    element.style.top = `${targetCenterY - (elementHeight / 2)}px`;
  };

  // Function to create a message in the center of an element or update an existing one
  function createOrGetMessage(elem, html) {
    let existingMessage = document.getElementById('center-message');

    if (!existingMessage) {
      const messageDiv = new CreateDiv({ id: 'center-message', className: 'center-message' });
      messageDiv.element.innerHTML = html;
      elem.appendChild(messageDiv.getElement());

      centerElement(messageDiv.getElement(), elem);

      return messageDiv.getElement();
    } else {
      existingMessage.innerHTML = html;
      return existingMessage;
    }
  }

  // Event listener to show a temporary message when clicking on the cat image
  catImg.addEventListener('click', () => {
    const message = createOrGetMessage(catContainer, 'Hello, world!');
    setTimeout(() => {
      message.remove();
    }, 2000);
  });
});
