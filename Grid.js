import Paint from './Paint.js';
import State from './State.js';


const Grid = {
  squareSize: 25, // Initial square size
    
  canvas: null,

  init(data) {
    this.data = State.mapArray;
    this.canvas = document.getElementById('gridCanvas');

    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.canvas.style.position = 'absolute';
      this.canvas.style.left = '50%';
      this.canvas.style.top = '50%';
      this.canvas.style.transform = 'translate(-50%, -50%)'; // Center the canvas
     

    // Add keydown event listener for zooming
      //document.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.renderGrid(data);

    // Initialize Paint module with gridData       
      Paint.init(data);
      this.updateCanvasSize(Math.ceil(Math.sqrt(this.data.length))); 
   
      } else {
      console.error("Canvas not found");
    }
  },      

  renderGrid(data) {
    const gridCanvas = document.getElementById('gridCanvas');

    if (gridCanvas) {
      const ctx = gridCanvas.getContext('2d');
     
      const squareSize = this.squareSize; // Relative to Zooming in and out

      const canvasWidth =  data.length * squareSize;
      const canvasHeight = data[0].length * squareSize;

      gridCanvas.width =  canvasWidth ;
      gridCanvas.height = canvasHeight ;

      data.forEach((col, x) => {
        col.forEach((_, y) => {

          ctx.fillStyle = data[x][y].fill;
          ctx.fillRect(x*squareSize, y*squareSize, squareSize, squareSize);
          ctx.strokeStyle = '#2596be';
          ctx.lineWidth = squareSize/20;
          ctx.strokeRect(x*squareSize, y*squareSize, squareSize, squareSize);
  
          
          if (squareSize > 63) {
            
            const maxTextWidth = squareSize * 0.9; // Allow 90% of the square width for text
            const lineHeight = squareSize / 5; // Adjust the line height as needed
            
            const words = data[x][y].name.split(' ');
            const lines = [];
            let currentLine = words[0];
            
            for (let i = 1; i < words.length; i++) {
              const testLine = currentLine + ' ' + words[i];
              const testWidth = ctx.measureText(testLine).width;
              
              if (testWidth <= maxTextWidth) {
                currentLine = testLine;
              } else {
                lines.push(currentLine);
                currentLine = words[i];
              }
            }
            
            lines.push(currentLine); // Add the last line
            
            ctx.fillStyle = 'white';
            ctx.font = 'Bold ' + lineHeight + 'px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Render wrapped text lines
            for (let i = 0; i < lines.length; i++) {
              const lineY = (y * squareSize) + (squareSize / 2) - (lineHeight * (lines.length - 1) / 2) + (lineHeight * i);
              ctx.fillText(lines[i], (x * squareSize) + (squareSize / 2), lineY);
            }
          }
         


        })

      })

     
    } else {
      console.error("gridCanvas not found");
    }
    
    this.updateCanvas();
  },


  getCurrentData() {
    return State.mapArray;
  },

  moveSquare(oldRow, oldCol, newRow, newCol) {
   
    // Ensure new position is within the valid range
    if (newRow >= 0 && newRow <  State.mapArray.length &&
        newCol >= 0 && newCol <  State.mapArray[0].length) {

      const squareToMove =  State.mapArray[oldRow][oldCol];
      console.log(squareToMove)
      const squareAtNewPos = State.mapArray[newRow][newCol];
      console.log('Moving to ... ' + newRow + ',' + newCol)

      // Swap data between squares
      State.mapArray[oldRow][oldCol] = squareAtNewPos;
      State.mapArray[newRow][newCol] = squareToMove;

      // Re-render the grid
      this.renderGrid(State.mapArray);

      Paint.isFirstClick = true;
      
    }
  },

  updateCanvasSize() {
    const canvasesToUpdate = ['paintCanvas', 'imageCanvas'];

  canvasesToUpdate.forEach(canvasId => {
    const canvas = document.getElementById(canvasId);

    if (canvas) {
      const squareSize = this.squareSize; // Relative to Zooming in and out
      const canvasWidth = State.mapArray.length * squareSize;
      const canvasHeight = State.mapArray[0].length * squareSize;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    } else {
      console.error(`${canvasId} not found`);
    }
  });
  
  this.updateCanvas(); // Update other properties/styles for paintCanvas
},



  
  updateCanvas() {
    const paintCanvas = document.getElementById('paintCanvas');
  
    if (paintCanvas) {
      paintCanvas.width = this.canvas.width;
      paintCanvas.height = this.canvas.height;
    }
  },
  


};

export default Grid;
