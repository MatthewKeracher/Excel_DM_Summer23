// Paint.js

import State from './State.js'; 
import Grid from './Grid.js'; 
import { playBoopSound } from './Boop.js';


const editForm = {
  form: document.getElementById('edit-form'),
  x: document.getElementById('form-x'),
  y: document.getElementById("form-y"), 
  name: document.getElementById("form-name"), 
  fill: document.getElementById("form-fill"),
  image:document.getElementById("form-image")
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

    //imageMode variables.
    imageMode: false,

    //moveMode variables.
    moveMode: false,
    oldRow: 0,
    newRow: 0,
    oldCol: 0,
    newCol: 0,

    isFirstClick: true, // Flag to track the first click
    paintCanvas: null,
    gridData: null,
    selectedColor: State.defaultFill,
    Square: '',

    togglePaintMode() {
      this.paintBlock = !this.paintBlock;
      },
  
  
    init(gridData) {
      this.paintCanvas = document.getElementById('paintCanvas');
      this.gridData = gridData;   
      
      
      this.paintCanvas.addEventListener('dblclick', this.handleCanvasDoubleClick.bind(this));
        
    
    },

    handleCanvasDoubleClick(event) {
      const rect = this.paintCanvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
    
      // Calculate the row and column based on the click position
      const gridSize = this.gridData.length;
      const squareSize = this.paintCanvas.width / gridSize;
      const col = Math.floor(mouseX / squareSize);
      const row = Math.floor(mouseY / squareSize);
    
      // Update the fill of the selected square to transparent
      this.Square = State.mapArray[col][row];
      this.Square.fill = 'transparent';
    
      // Redraw the grid to apply the changes
      Grid.renderGrid(State.mapArray);
    },

      
          handleCanvasClick(event) {

            //console.log("SOMEONE CLICKED")

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

            this.Square = State.mapArray[col][row]

            //MOVING SQUARES

            if(this.moveMode === true){             

              if(this.isFirstClick === true) {

                this.oldRow = Math.floor(mouseX / squareSize);
                this.oldCol = Math.floor(mouseY / squareSize);

                Paint.isFirstClick = false; 
                console.log(Paint.isFirstClick)

                console.log(this.oldRow + ',' + this.oldCol + ' ' + this.newRow + ',' + this.newCol)


              }else{

                this.newRow = Math.floor(mouseX / squareSize);
                this.newCol = Math.floor(mouseY / squareSize);
                
              Grid.moveSquare(this.oldRow, this.oldCol, this.newRow, this.newCol);
            
              document.querySelector('#moveButton').click();
              //console.log(this.oldRow + ',' + this.oldCol + ' ' + this.newRow + ',' + this.newCol)

              this.oldRow = 0;
              this.oldCol = 0;
              this.newRow = 0;
              this.newCol = 0;
            
              }           
      
              
            }    

            //PAINTING SQUARES AND EDITING SQUARES
            
            editForm.name.value = this.Square.name
            editForm.fill.value = this.Square.fill
            editForm.x.value = col;
            editForm.y.value = row;
            textbox.value = this.Square.text
            namebox.value = this.Square.name
            editForm.image.value = this.Square.image
           
            // Check if paint mode is ACTIVE.
            if (!this.paintBlock) {             
            editForm.fill.value = this.selectedColor;                
           
            // Single click ==> Submits Form
            editForm.form.querySelector('button[type="submit"]').click();
            
            }

            // Draw outline on the paintCanvas
            this.drawOutline(col * squareSize, row * squareSize, squareSize, squareSize);  
            
                          
            },
  

handleSubmit(e) {
 
e.preventDefault(); // Prevent the default form submission behavior
     
const x = editForm.x.value; // Get the x value from the form
const y = editForm.y.value; // Get the y value from the form  

  State.mapArray[x][y] = {

    name: namebox.value,
    fill: editForm.fill.value,
    text: textbox.value,
    image: editForm.image.value}    

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

      // if (Paint.paintBlock) {
      //NOT PAINTING
      paintCtx.strokeStyle = 'lime';
      // } else {
      // paintCtx.strokeStyle = Paint.selectedColor;}      
      paintCtx.lineWidth = 6;
      paintCtx.strokeRect(x, y, width, height);
     
},



};

export default Paint;
