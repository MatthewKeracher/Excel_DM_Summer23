import Paint from './Paint.js';
const canvasContainer = document.querySelector('.canvas-container');
const imageCanvas = document.getElementById('imageCanvas');
let isDragging = false;
let isImageDragging = false;
let startX = 0;
let startY = 0;
let startImageX = 0;
let startImageY = 0;

canvasContainer.addEventListener('mousedown', (e) => {
  if (!Paint.imageMode) {
    isDragging = true;
    startX = e.clientX - imageCanvas.offsetLeft;
    startY = e.clientY - imageCanvas.offsetTop;
    canvasContainer.style.cursor = 'grabbing';
  } else {
    console.log('')
    isImageDragging = true;
    startImageX = e.clientX - parseInt(imageCanvas.style.backgroundPositionX || 0);
    startImageY = e.clientY - parseInt(imageCanvas.style.backgroundPositionY || 0);
    canvasContainer.style.cursor = 'grabbing';
  }
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const offsetX = e.clientX - startX;
    const offsetY = e.clientY - startY;
    canvasContainer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  } else if (isImageDragging && Paint.imageMode) {
    const offsetX = e.clientX - startImageX;
    const offsetY = e.clientY - startImageY;
    imageCanvas.style.backgroundPositionX = `${offsetX}px`;
    imageCanvas.style.backgroundPositionY = `${offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  isImageDragging = false;
  canvasContainer.style.cursor = 'grab';
});

canvasContainer.addEventListener('mouseleave', () => {
  isDragging = false;
  isImageDragging = false;
  canvasContainer.style.cursor = 'grab';
});
