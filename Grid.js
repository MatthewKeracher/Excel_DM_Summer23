const Grid = {
    squareSize: 50, // Initial square size
    canvas: null,
  
    init(data) {
      this.data = data;
      this.canvas = document.getElementById('gridCanvas');
  
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Set the canvas context globalAlpha for transparency
        //this.ctx.globalAlpha = 1; // Adjust the transparency value as needed
    
  
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '50%';
        this.canvas.style.top = '50%';
        this.canvas.style.transform = 'translate(-50%, -50%)'; // Center the canvas
  
         // Add keydown event listener for zooming
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.renderGrid(data);
      
        } else {
        console.error("Canvas not found");
      }
    },

    handleKeyDown(event) {
        if (event.key === '-') {
          // Zoom out
          this.squareSize -= 5; // Adjust the step size as needed
          this.renderGrid(this.data);
        } else if (event.key === '=') {
          // Zoom in
          this.squareSize += 5; // Adjust the step size as needed
          this.renderGrid(this.data);
        }
      },
  
    renderGrid(data) {
      const gridCanvas = document.getElementById('gridCanvas');
  
      if (gridCanvas) {
        const ctx = gridCanvas.getContext('2d');
  
        const gridSize = Math.ceil(Math.sqrt(data.length));
        const squareSize = 50;
  
        const canvasWidth = gridSize * squareSize;
        const canvasHeight = gridSize * squareSize;
  
        gridCanvas.width = canvasWidth;
        gridCanvas.height = canvasHeight;
  
        data.forEach((item, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
  
          const x = col * squareSize;
          const y = row * squareSize;
  
          ctx.fillStyle = item.fill;
          ctx.fillRect(x, y, squareSize, squareSize);
  
          ctx.fillStyle = 'white';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.name, x + squareSize / 2, y + squareSize / 2);
        });
      } else {
        console.error("gridCanvas not found");
      }
    },
  
    getCurrentData() {
      return this.data;
    },
  };
  
  export default Grid;
  
  