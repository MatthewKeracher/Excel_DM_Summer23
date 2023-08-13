// dragCanvas.js
const canvasContainer = document.querySelector('.canvas-container');
let isDragging = false;
let startX = 0;
let startY = 0;

canvasContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - canvasContainer.offsetLeft;
  startY = e.clientY - canvasContainer.offsetTop;
  canvasContainer.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const offsetX = e.clientX - startX;
  const offsetY = e.clientY - startY;
  canvasContainer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  canvasContainer.style.cursor = 'grab';
});

canvasContainer.addEventListener('mouseleave', () => {
  isDragging = false;
  canvasContainer.style.cursor = 'grab';
});

