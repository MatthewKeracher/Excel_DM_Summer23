// Paint.js

import State from './State.js'; // Make sure to adjust the import path

const editForm = {
  form: document.getElementById('edit-form'),
  x: document.getElementById('form-x'),
  y: document.getElementById("form-y"), 
  name: document.getElementById("form-name"), 
  fill: document.getElementById("form-fill")
}

const Paint = {

    paintCanvas: null,
    gridData: null,
  
    init(gridData) {
      this.paintCanvas = document.getElementById('paintCanvas');
      this.gridData = gridData;
       
      if (this.paintCanvas) {
        this.paintCanvas.addEventListener('click', this.handleCanvasClick.bind(this)); // Bind the context here
        // ...
      } else {
        console.error("paintCanvas not found");
      }
    },
  
      handleCanvasClick(event) {
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
      

        editForm.form.removeAttribute('style')
        editForm.x.value = col
        editForm.y.value = row
        editForm.name.value = "" + col + " - " + row
        editForm.fill.value = "white"

        // Add an event listener for the form submit event
        editForm.form.addEventListener('submit', this.handleSubmit.bind(this));
       
        
         
      },

      // Handles Form Submit
        handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        console.log(State.MasterArray)

        const x = editForm.x.value; // Get the x value from the form
        const y = editForm.y.value; // Get the y value from the form

        console.log(x + y)


      // Update the data in the MasterArray at the specified x and y coordinates
      State.MasterArray[x][y] = { name: editForm.name.value, fill: editForm.fill.value }

      // Log the updated MasterArray to the console
      console.log(State.MasterArray);
  
    },
  
     
     getClickedSquareData() {
      return this.clickedSquareData;
     },
  
    drawOutline(x, y, width, height) {
      const paintCtx = this.paintCanvas.getContext('2d');
      
      paintCtx.clearRect(0, 0, this.paintCanvas.width, this.paintCanvas.height);
      paintCtx.strokeStyle = 'red';
      paintCtx.lineWidth = 4;
      paintCtx.strokeRect(x, y, width, height);
    },
};

export default Paint;
