// Paint.js

import State from './State.js'; 
import Grid from './Grid.js'; 
import { playBoopSound } from './Boop.js';


const editForm = {
  form: document.getElementById('edit-form'),
  x: document.getElementById('form-x'),
  y: document.getElementById("form-y"), 
  name: document.getElementById("form-name"), 
  fill: document.getElementById("form-fill")
}

export { editForm };

const colorPalette = document.querySelectorAll('.color');
const textbox = document.getElementById('Textbox')
const namebox = document.getElementById('Namebox')



colorPalette.forEach(color => {
  color.addEventListener('click', () => {
    const clickSound = document.getElementById('clickSound');        
    clickSound.currentTime = 1.5; // Rewind the sound to the beginning
    clickSound.play(); // Play the sound
    
    Paint.selectedColor = color.getAttribute('data-color');
    
    if (Paint.isFirstClick) {
      Paint.togglePaintMode();
      Paint.isFirstClick = false; // Set the flag to indicate first click has happened
    }
    
    editForm.fill.value = Paint.selectedColor;
  });
});

// colorPicker.addEventListener('input', event => {
//     const selectedColor = event.target.value;
//     colorPreview.style.backgroundColor = selectedColor;

//     // Update the fill field in the edit form
//     editForm.fill.value = selectedColor;
// });



const Paint = {

    paintBlock: true,
    isFirstClick: true, // Flag to track the first click
    paintCanvas: null,
    gridData: null,
    selectedColor: '',

    togglePaintMode() {
      this.paintBlock = !this.paintBlock;
      },
  
  
    init(gridData) {
      this.paintCanvas = document.getElementById('paintCanvas');
      this.gridData = gridData;
       
      if (this.paintCanvas) {
        this.paintCanvas.addEventListener('click', this.handleCanvasClick.bind(this)); // Bind the context here       
      } else {
        console.error("paintCanvas not found");
      }},

      
          handleCanvasClick(event) {

            const clickSound = document.getElementById('clickSound');        
            clickSound.currentTime = 1.5; // Rewind the sound to the beginning
            clickSound.play(); // Play the sound
            
            const rect = this.paintCanvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
          
            // Calculate the row and column based on the click position
            const gridSize = this.gridData.length;
            const squareSize = this.paintCanvas.width / gridSize;
          
            const col = Math.floor(mouseX / squareSize);
            const row = Math.floor(mouseY / squareSize);
            const index = row * gridSize + col;
            
          
            // Draw outline on the paintCanvas
            this.drawOutline(col * squareSize, row * squareSize, squareSize, squareSize);
          
            // Store the clicked square data
            this.SqData = this.gridData[index];      
            
            //When click on canvas ready variables for Form submit

            let Square = State.mapArray[col][row]

            //console.log(row + ' ' + col + ' ' + Square.fill)

            //namebox.focus();
            
            editForm.name.value = Square.name
            editForm.fill.value = Square.fill
            editForm.x.value = col;
            editForm.y.value = row;
            textbox.value = Square.text
            namebox.value = Square.name

            
                      
            // Check if paint mode is ACTIVE.
            if (!this.paintBlock) {             
            editForm.fill.value = this.selectedColor;                
            

            // Single click ==> Submits Form
            editForm.form.querySelector('button[type="submit"]').click();
            
            }

            // Draw outline on the paintCanvas
            this.drawOutline(col * squareSize, row * squareSize, squareSize, squareSize);   
              
            },


// Handles Form Submit

handleSubmit(e) {
 
e.preventDefault(); // Prevent the default form submission behavior
     
const x = editForm.x.value; // Get the x value from the form
const y = editForm.y.value; // Get the y value from the form  

  State.mapArray[x][y] = {

    name: namebox.value,
    fill: editForm.fill.value,
    text: textbox.value,}    

Grid.renderGrid(State.mapArray)



},

    
     
getClickedSquareData() {
      return this.clickedSquareData;
},
  
drawOutline(x, y, width, height) {
      const paintCtx = this.paintCanvas.getContext('2d');
      
      if (!textbox.contains(document.activeElement)) {
        paintCtx.clearRect(0, 0, this.paintCanvas.width, this.paintCanvas.height);
      }      

      if (Paint.paintBlock) {
      //NOT PAINTING
      paintCtx.strokeStyle = 'lime';
      } else {
      paintCtx.strokeStyle = Paint.selectedColor;}      
      paintCtx.lineWidth = 6;
      paintCtx.strokeRect(x, y, width, height);

      
},



};

export default Paint;
