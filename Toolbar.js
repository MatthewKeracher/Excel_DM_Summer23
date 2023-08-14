//Toolbar.js

import Grid from './Grid.js';
import Paint from './Paint.js';
import State from './State.js';

import { editForm } from './Paint.js'; 
 
class Toolbar {
  constructor() {
  this.handleFileUpload = this.handleFileUpload.bind(this); // Bind the method to the class instance
  }

  //Initialises other modules. Is the root module.
  init() {

    const imageButton = document.getElementById('imageButton');
    imageButton.addEventListener('click', this.handleImageButtonClick); 
          
    let currentImageScale = 1;

    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', this.handleAddButtonClick);  

    const newButton = document.getElementById('newButton');
    newButton.addEventListener('click', this.handleNewButtonClick);  

    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', this.handleSaveButtonClick);

    const loadButton = document.getElementById('loadButton');
    loadButton.addEventListener('click', this.handleLoadButtonClick);

    const moveButton = document.getElementById('moveButton');
    moveButton.addEventListener('click', this.handleMoveButtonClick);

    const paintButton = document.getElementById('paintButton');
    paintButton.addEventListener('click', this.handlePaintButtonClick);

    const fillButton = document.getElementById('fillButton');
    fillButton.addEventListener('click', this.handlefillButtonClick);

    document.addEventListener('keydown', event => {
      const activeElement = document.activeElement.tagName.toLowerCase();
    
      if (activeElement !== 'input' && activeElement !== 'textarea') {

        const clickSound = document.getElementById('clickSound');        
        clickSound.currentTime = 1.5; // Rewind the sound to the beginning
        clickSound.play(); // Play the sound

        switch (event.key) {

          case 'b':
          case 'B':
            this.handleImageButtonClick();
            break;

          case 'a':
          case 'A':
            this.handleAddButtonClick();
            break;

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
            
          case 'm':
            case 'M':
              this.handleMoveButtonClick();
              break;
    
          case 'p':
          case 'P':
            this.handlePaintButtonClick();
            break;

          case 'f':
          case 'F':
            this.handleFillButtonClick();
            break;

          
          case '-':
              // Zoom out

              if (Paint.imageMode) {
          
                const zoomIncrement = 0.1; 
               
                currentImageScale -= zoomIncrement;
                imageCanvas.style.backgroundSize = `${100 * currentImageScale}%`;
                
              }else{

              Grid.squareSize -= 3;
              Grid.renderGrid(State.mapArray);
              Grid.updateCanvasSize(State.mapArray.length);}           

              break;

          case '=':
             //Zoom in
         
             if (Paint.imageMode) {  
          
              const zoomIncrement = 0.1; 

              currentImageScale += zoomIncrement;
              imageCanvas.style.backgroundSize = `${100 * currentImageScale}%`;

             }else{

              Grid.squareSize += 3;
              Grid.renderGrid(State.mapArray);
              Grid.updateCanvasSize(State.mapArray.length);}

              break;  
              
              //Arrow Keys
           
            default:
            // Handle other key presses if necessary
            break;
        }
      }


    });
    
    State.init(); // Start listening for JSON data changes. 

    
    //console.log('Canvas Click Event listener made.')
    Paint.paintCanvas.addEventListener('click', Paint.handleCanvasClick.bind(Paint)); // Bind the context here       
      

    // Add the new event listener for the form submit event
    editForm.form.addEventListener('submit', Paint.handleSubmit.bind(Paint)); // this
  
  }


  handleImageButtonClick() {
    

     //If Painter is on, turn it off!
     if (document.getElementById('painter').style.display === 'grid') {
      document.querySelector('#paintButton').click();
      }
      
      if (Paint.imageMode === true) {
         
        imageButton.classList.remove('paint-button');
        Paint.imageMode = false;
      
        
      }else{ if (Paint.imageMode === false)  {
  
        imageButton.classList.add('paint-button');
        Paint.imageMode = true; 

        const imageUrl = prompt("Enter the URL of the image:");

      if (imageUrl) {
      const imageCanvas = document.getElementById('imageCanvas');
      imageCanvas.style.backgroundImage = `url(${imageUrl})`;
      imageCanvas.style.backgroundRepeat = 'no-repeat';
      }
       
      }
    
      //console.log(Paint.imageMode)
    
    }  
  
    
  }

  handleFillButtonClick() {
    // Ask for confirmation before performing the fill operation
    const confirmMessage = "Are you sure you want to fill all default color tiles with the selected color?";
    const userConfirmed = confirm(confirmMessage);
  
    if (!userConfirmed) {
      return; // Exit the function if the user cancels the confirmation
    }
  
    console.log('Filling default color tiles with the selected color.');
    
    const newFill = Paint.selectedColor; // Get the selected color
    const defaultFill = State.defaultFill; // Get the default fill color
    
    for (let row = 0; row < State.mapArray.length; row++) {
      for (let col = 0; col < State.mapArray[row].length; col++) {
        if (State.mapArray[row][col].fill === defaultFill) {
          State.mapArray[row][col].fill = newFill; // Update the fill property for default color tiles
        }
      }
    }
  
    State.defaultFill = Paint.selectedColor; // Update the defaultFill to the selected color
  
    // After updating the tiles and defaultFill, you might want to redraw the grid to reflect the changes
    Grid.renderGrid(State.mapArray);
  }
  
  handlePaintButtonClick() {

      const clickSound = document.getElementById('clickSound');        
      clickSound.currentTime = 1.5; // Rewind the sound to the beginning
      clickSound.play(); // Play the sound

      // //If moveMode is on, turn it off!
      // if (Paint.moveMode === true) {
      // document.querySelector('#moveButton').click();
      // }

    let painter = document.getElementById('painter');

    //console.log("isFirstClick: " + Paint.isFirstClick)
     
    if (painter.style.display === 'none') {
      //PAINTING 
      paintButton.classList.add('paint-button');
      painter.style.display = 'grid'; 
      // editForm.form.style.display = 'block'; 
      //Paint.isFirstClick = true;     
    
    }else{ 
    
    if (painter.style.display === 'grid') {
      // NOT PAINTING
      Paint.togglePaintMode();
      Paint.isFirstClick = true;
      paintButton.classList.remove('paint-button');
      painter.style.display = 'none';
 
    }}  


  }       

  handleNewButtonClick() {     

    const clickSound = document.getElementById('clickSound');        
        clickSound.currentTime = 1.5; // Rewind the sound to the beginning
        clickSound.play(); // Play the sound
        
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight; 
    
    const fullWidth = Math.floor(screenWidth / Grid.squareSize);
    const fullHeight = Math.floor(screenHeight / Grid.squareSize);
    
    const gridSizeInput = prompt("Enter the grid size (width, height):", fullWidth + "," + fullHeight);
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

    //If Painter is on, turn it off!
    if (document.getElementById('painter').style.display === 'grid') {
      document.querySelector('#paintButton').click();
      }

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

  handleMoveButtonClick() {
    
    //If Painter is on, turn it off!
    if (document.getElementById('painter').style.display === 'grid') {
    document.querySelector('#paintButton').click();
    }
    
    if (Paint.moveMode === true) {
       
      moveButton.classList.remove('paint-button');
      Paint.moveMode = false;
      //Paint.isFirstClick = false;
      
    }else{ if (Paint.moveMode === false)  {

      moveButton.classList.add('paint-button');
      Paint.moveMode = true; 
      Paint.isFirstClick = true;    
      

    }}      
       
    console.log("Paint button clicked and firstClick is " + Paint.isFirstClick)

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

  handleAddButtonClick() {
  State.addtoMap()
  }

};

const toolbar = new Toolbar();
toolbar.init(); // Initialize the toolbar

export default toolbar;
