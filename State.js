import Grid from './Grid.js';


const State = {
  mapArray: [],
  defaultFill: '#2596be',

  // Returns an array of columns and rows from which the map is generated. 
  generateMap(genWidth, genHeight) {

    const rows = Array.from({ length: genWidth }, (_, x) => {
      const columns = Array.from({ length: genHeight }, (_, y) => ({
        name: '',
        fill: this.defaultFill,
        text: ''
      }));
      return columns;
    });
    console.log('generateMap() returned this:', rows)
    return rows;
  },

  // Placeholder that returns a random colour to be entered against fill above. 
  getRandomColor() {
    const colors = ['red', 'pink', 'green', 'cyan', 'orange', 'purple'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  },

  //Exports the MasterArray as JSON data to a file. 
  exportJSONData(data) {
    const fileName = prompt('Enter a file name:', 'data.json');
    const projectTitle = document.getElementById('projectTitle');
          projectTitle.textContent = fileName + '.json' || 'Untitled';
          console.log('Project title updated:', projectTitle.textContent);
        

    if (!fileName) {
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  },

  init() {

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight; 
    
    const fullWidth = Math.floor(screenWidth / Grid.squareSize);
    const fullHeight = Math.floor(screenHeight / Grid.squareSize);

    //console.log('State.init()')
    this.mapArray = this.generateMap(fullWidth,fullHeight); 
    Grid.init(this.mapArray);
    
    
  },

  addtoMap() {
    const newRows = 2; // Number of new rows to add
    const newColumns = 2; // Number of new columns to add
    const originalRows = State.mapArray.length;
    const originalColumns = State.mapArray[0].length;
    const rowOffset = Math.floor(newRows / 2);
    const colOffset = Math.floor(newColumns / 2);
    
    // Update the map data for both top and bottom sides
    for (let row = originalRows - 1; row >= 0; row--) {
      State.mapArray[row + rowOffset] = [...State.mapArray[row]];
      State.mapArray[row] = Array.from({ length: originalColumns + newColumns }).fill({ name: '', fill: this.defaultFill, text: '' });
    }
    
    // Update the map data for the top side
    for (let row = originalRows + rowOffset; row < originalRows + newRows; row++) {
      State.mapArray[row] = Array.from({ length: originalColumns + newColumns }).fill({ name: '', fill: this.defaultFill, text: '' });
    }
    
    // Update the map data for the left and right sides
    for (let row = 0; row < State.mapArray.length; row++) {
      for (let col = originalColumns - 1; col >= 0; col--) {
        State.mapArray[row][col + colOffset] = State.mapArray[row][col];
        State.mapArray[row][col] = { name: '', fill: this.defaultFill, text: '' };
      }
      
      for (let col = originalColumns + colOffset; col < originalColumns + newColumns; col++) {
        State.mapArray[row][col] = { name: '', fill: this.defaultFill, text: '' };
      }
    }
    
    Grid.renderGrid(State.mapArray);
  }
  
  
  
       

};
export default State;
