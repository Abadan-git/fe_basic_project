const catBubble = document.getElementById('catBubble');
const catNameLogo = document.getElementById('catNameLogo');
const catHugImg = document.getElementById('catHugImg');
const catHealthImg = document.getElementById('catHealthImg');
const catDietImg = document.getElementById('catDietImg');
const catGalleryImg = document.getElementById('catGalleryImg');
const fewWords = document.getElementById('clickBtn');

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


const handleToggleClick = (element, { toggleText1, toggleText2} = {}) => {
  let toggleState = false;

  element.addEventListener('click', () => {
    toggleState = !toggleState;
    updateElement(element, { html: toggleState ? toggleText2 : toggleText1});
  });
};


handleHover(catBubble, { hoverText: 'Meowww', leaveText: 'Pet me' });
handleHover(catNameLogo, { hoverText: 'MY BABY', leaveText: 'SOLOMON', hoverColor: '#6ED5DB', leaveColor: 'black' });
handleHover(catHugImg, { hoverImage: 'images/index_images/cat_hug.gif', leaveImage: 'images/index_images/cat_hug.png' });
handleHover(catHealthImg, { hoverImage: 'images/index_images/cat_health.gif', leaveImage: 'images/index_images/cat_health.png' });
handleHover(catDietImg, { hoverImage: 'images/index_images/cat_diet.gif', leaveImage: 'images/index_images/cat_diet.png' });
handleHover(catGalleryImg, { hoverImage: 'images/index_images/cat_gallery.gif', leaveImage: 'images/index_images/cat_gallery.png' });
handleToggleClick(fewWords, {
  toggleText1: '<strong>Click me!</strong>',
  toggleText2: '<strong>Click me again!</strong>'
});
