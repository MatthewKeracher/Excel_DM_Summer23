

import Grid from './Grid.js';
import Paint from './Paint.js';
import State from './State.js';
//import Sidebar from './Sidebar.js'; 


class Toolbar {
  constructor() {
    this.handleFileUpload = this.handleFileUpload.bind(this); // Bind the method to the class instance
  }

  init() {
    const newButton = document.getElementById('newButton');
    newButton.addEventListener('click', this.handleNewButtonClick);

    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', this.handleSaveButtonClick);
  
    const loadButton = document.getElementById('loadButton');
    loadButton.addEventListener('click', this.handleLoadButtonClick);
    
    State.init(); // Start listening for JSON data changes. 
    //Sidebar.init();
    }

    handleNewButtonClick() {
      const gridSize = 10 // parseInt(prompt("Enter the grid size:", "10")); // Set default value to 10
    
      if (!isNaN(gridSize) && gridSize > 0) {
        const numEntries = gridSize //* gridSize; // Calculate total entries based on grid size
        const newData = State.generateMap(numEntries, gridSize);
        Grid.init(newData);
        const projectTitle = document.getElementById('projectTitle');
        projectTitle.textContent = 'Untitled';
      } else {
        alert("Invalid input. Please enter a valid grid size.");
      }
    }
    
    

  handleSaveButtonClick() {
    const currentData = Grid.getCurrentData();
    if (currentData) {
      State.exportJSONData(currentData);
    } else {
      alert("No data to export.");
    }
  }

  handleLoadButtonClick = () => {
    console.log(this); // Debugging line
    console.log('Load button clicked...'); 
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.addEventListener('change', this.handleFileUpload);
    input.click();
    console.log('File chosen...'); 
  }
  
  handleFileUpload = (event) => {
    console.log('File loading...'); // Add this line
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
  
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          console.log('File contents loaded:', event.target.result);
          const jsonData = JSON.parse(event.target.result);
          Grid.init(jsonData); // Replace the grid data with loaded data
          // Update project title with loaded file name or "Untitled"
          const projectTitle = document.getElementById('projectTitle');
          projectTitle.textContent = file.name || 'Untitled';
          console.log('Project title updated:', projectTitle.textContent);
        } catch (error) {
          alert("Error reading JSON file.");
          console.error('Error reading JSON:', error);
        }
      }
      reader.readAsText(file);
    }
  }

  };


const toolbar = new Toolbar();
toolbar.init(); // Initialize the toolbar

export default toolbar;
