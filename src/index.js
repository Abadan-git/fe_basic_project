const catBubble = document.getElementById('catBubble');

const handleHover= (event) => {
  catBubble.innerHTML = 'Meowww';
}
const handleLeave= (event) => {
  catBubble.innerHTML = 'Pet me';
}

catBubble.addEventListener('mouseenter', handleHover);
catBubble.addEventListener('mouseleave', handleLeave);
