//Toolbar.js

import Grid from './Grid.js';
import Paint from './Paint.js';
import State from './State.js';

import { editForm } from './Paint.js'; 
 
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

    const paintButton = document.getElementById('paintButton');
    paintButton.addEventListener('click', this.handlePaintButtonClick);

    document.addEventListener('keydown', event => {
      const activeElement = document.activeElement.tagName.toLowerCase();
    
      if (activeElement !== 'input' && activeElement !== 'textarea') {

        const clickSound = document.getElementById('clickSound');        
        clickSound.currentTime = 1.5; // Rewind the sound to the beginning
        clickSound.play(); // Play the sound

        switch (event.key) {
          case 'n':
          case 'N':
            this.handleNewButtonClick();
            break;
    
          case 's':
          case 'S':
            this.handleSaveButtonClick();
            break;
    
          case 'l':
          case 'L':
            this.handleLoadButtonClick();
            break;
    
          case 'p':
          case 'P':
            this.handlePaintButtonClick();
            break;

            case 'r':
              // Prompt to change the name
              const newName = prompt('Enter a new name:');
              if (newName !== null) {
                editForm.name.value = newName;
              }
              break;
    
          // Add more cases for other hotkeys as needed
    
          default:
            // Handle other key presses if necessary
            break;
        }
      }
    });
    
    State.init(); // Start listening for JSON data changes. 
  
  }

  handlePaintButtonClick() {

      const clickSound = document.getElementById('clickSound');        
      clickSound.currentTime = 1.5; // Rewind the sound to the beginning
      clickSound.play(); // Play the sound

    let painter = document.getElementById('painter')
    //let editForm = document.getElementById('editForm')

    Paint.togglePaintMode();
    // Check if paint mode is active
    if (Paint.paintMode) {
    //NOT PAINTING
    paintButton.classList.remove('paint-button');
    painter.style.display = 'none';
    //editForm.form.style.display = 'none';
  
    } else {
    
    paintButton.classList.add('paint-button');
    painter.style.display = 'grid'; 
    //editForm.form.style.display = 'block';
    }

  }       

  handleNewButtonClick() {     

    const clickSound = document.getElementById('clickSound');        
        clickSound.currentTime = 1.5; // Rewind the sound to the beginning
        clickSound.play(); // Play the sound
      
      const gridSize =  parseInt(prompt("Enter the grid size:", "10")); // Set default value to 10
      
      if (!isNaN(gridSize) && gridSize > 0) {
        const numEntries = gridSize //* gridSize; // Calculate total entries based on grid size
        State.mapArray = State.generateMap(numEntries, gridSize);
        Grid.init(State.mapArray);
        const projectTitle = document.getElementById('projectTitle');
        projectTitle.textContent = 'Untitled';
      } else {
        alert("Invalid input. Please enter a valid grid size.");
      }
  }
   
  handleSaveButtonClick() {

    const clickSound = document.getElementById('clickSound');        
        clickSound.currentTime = 1.5; // Rewind the sound to the beginning
        clickSound.play(); // Play the sound

    const currentData = Grid.getCurrentData();
    if (currentData) {
      State.exportJSONData(currentData);
      
    } else {
      alert("No data to export.");
    }
  }

  handleLoadButtonClick = () => {

    const clickSound = document.getElementById('clickSound');        
        clickSound.currentTime = 1.5; // Rewind the sound to the beginning
        clickSound.play(); // Play the sound

    console.log(this); // Debugging line    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.addEventListener('change', this.handleFileUpload);
    input.click();
    
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
          State.mapArray = jsonData;
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
