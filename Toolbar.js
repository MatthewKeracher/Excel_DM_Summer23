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

          
          case '-':
              //prompt to zoom out
              // Zoom out
              Grid.squareSize -= 3;
              Grid.renderGrid(State.mapArray);
              Grid.updatePaintCanvasSize(State.mapArray.length);
              Grid.updatePaintCanvas();
              break;

          case '=':
              // Zoom in
              Grid.squareSize += 3;
              Grid.renderGrid(State.mapArray);
              Grid.updatePaintCanvasSize(State.mapArray.length);
              Grid.updatePaintCanvas();
              break;  
              
              //Arrow Keys
           
            default:
            // Handle other key presses if necessary
            break;
        }
      }
    });
    
    State.init(); // Start listening for JSON data changes. 

    // Add the new event listener for the form submit event
    editForm.form.addEventListener('submit', Paint.handleSubmit.bind(this));
  
  }

  handlePaintButtonClick() {

      const clickSound = document.getElementById('clickSound');        
      clickSound.currentTime = 1.5; // Rewind the sound to the beginning
      clickSound.play(); // Play the sound

    let painter = document.getElementById('painter')

    //let editForm = document.getElementById('editForm')

  
    if (painter.style.display === 'none') {
      //PAINTING 
      paintButton.classList.add('paint-button');
      painter.style.display = 'grid'; 
      // editForm.form.style.display = 'block';
    
    }else{ 
    
    if (painter.style.display === 'grid') {
      // NOT PAINTING
      Paint.togglePaintMode();
      Paint.isFirstClick = true;
      paintButton.classList.remove('paint-button');
      painter.style.display = 'none';
      // editForm.form.style.display = 'none';
    }}

    


  }       

  handleNewButtonClick() {     

    const clickSound = document.getElementById('clickSound');        
        clickSound.currentTime = 1.5; // Rewind the sound to the beginning
        clickSound.play(); // Play the sound
        
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
      

      const gridSizeInput = prompt("Enter the grid size (width, height):", "10,10");
      const gridSizeArray = gridSizeInput.split(',').map(Number);

      const mapWidth =  gridSizeArray[0] || 10; // Set default value to 10 if not provided
      const mapHeight = gridSizeArray[1] || 10; // Set default value to 10 if not provided

            
      if (!isNaN(mapWidth) && mapWidth > 0) {
        
        State.mapArray = State.generateMap(mapWidth, mapHeight);
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
