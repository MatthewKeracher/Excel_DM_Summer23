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
    
    const gridButton = document.getElementById('gridButton');
    gridButton.addEventListener('click', this.handleGridButtonClick);

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

        // console.log(
        //   'gridMode: ' + Grid.gridMode +
        //   '; imageMode: ' + Paint.imageMode 
        //           )

        switch (event.key) {

          case 'i':
          case 'I':
            this.handleImageButtonClick();
            break;

          case 'g':
          case 'G':
            this.handleGridButtonClick();
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
              if (Paint.imageMode) {
                const zoomIncrement = 0.1;                 
                currentImageScale -= zoomIncrement;
                imageCanvas.style.backgroundSize = `${100 * currentImageScale}%`;
              } else if (Grid.gridMode) {
                // Handle grid zoom out (if needed)
                // ...
              } else {
                // Handle canvas zoom out
                Grid.squareSize -= 3;
                Grid.renderGrid(State.mapArray);
                Grid.updateCanvasSize(State.mapArray.length);
              }
              break;
          
            case '=':
              if (Paint.imageMode) {  
                const zoomIncrement = 0.1; 
                currentImageScale += zoomIncrement;
                imageCanvas.style.backgroundSize = `${100 * currentImageScale}%`;
              } else if (Grid.gridMode) {
                // Handle grid zoom in (if needed)
                // ...
              } else {
                // Handle canvas zoom in
                Grid.squareSize += 3;
                Grid.renderGrid(State.mapArray);
                Grid.updateCanvasSize(State.mapArray.length);
              }

          break;   

          default:
          
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

    //If Grid is on, turn it off!
    if (Grid.gridMode) {
    document.querySelector('#gridButton').click();
    }
      
    if (Paint.imageMode) {
      imageButton.classList.remove('paint-button');
      Paint.imageMode = false;
      
    } else {
      imageButton.classList.add('paint-button');
      Paint.imageMode = true; 
      
    }
    
    
    
  }

  handleGridButtonClick() {
    

    //If Painter is on, turn it off!
    if (document.getElementById('painter').style.display === 'grid') {
     document.querySelector('#paintButton').click();
     }

    //If Image is on, turn it off!
    if (Paint.imageMode) {
      document.querySelector('#imageButton').click();
    }
     
    if (Grid.gridMode === true) {
      gridButton.classList.remove('paint-button');
      Grid.gridMode = false; // Use = for assignment instead of ===
   } else {
      gridButton.classList.add('paint-button');
      Grid.gridMode = true; 
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
 
    }
  

  }  


  }   

  handleNewButtonClick() {     

    const clickSound = document.getElementById('clickSound');        
        clickSound.currentTime = 1.5; // Rewind the sound to the beginning
        clickSound.play(); // Play the sound
     
        const imageUrl = prompt("Enter the URL of the image:");
        if (imageUrl) {
          const image = new Image();
          const imageCanvas = document.getElementById('imageCanvas');
          imageCanvas.style.backgroundImage = `url(${imageUrl})`;
          imageCanvas.style.backgroundRepeat = 'no-repeat';
        
          image.onload = () => {
            const imageWidth = Math.floor(image.width / Grid.squareSize);
            const imageHeight = Math.floor(image.height / Grid.squareSize);
              
            const mapWidth = imageWidth;
            const mapHeight = imageHeight;
        
            if (!isNaN(mapWidth) && mapWidth > 0) {
              State.mapArray = State.generateMap(mapWidth, mapHeight);
              //This is a problem!
              Grid.init(State.mapArray);
              const projectTitle = document.getElementById('projectTitle');
              projectTitle.textContent = 'Untitled';
            } else {
              alert("Invalid input. Please enter a valid grid size.");
            }
      
            State.mapArray[0][0].image = imageUrl;
            
      
          };
        
          image.src = imageUrl;
        }    

  }
    
  handleLoadButtonClick = () => {

      //If Painter is showing, hide it!
      if (document.getElementById('painter').style.display === 'grid') {
        document.querySelector('#paintButton').click();
      }
    
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.addEventListener('change', this.handleFileUpload);
      input.click();
  }
  
  handleFileUpload = (event) => {
      const file = event.target.files[0];
      
      if (file) {
        console.log('File selected:', file.name);
    
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonData = JSON.parse(event.target.result);
            
            State.mapArray = jsonData;
            Grid.init(State.mapArray);
            
            const projectTitle = document.getElementById('projectTitle');
            projectTitle.textContent = file.name; 
                          
            const imageUrl = State.mapArray[0][0].image;
            console.log(imageUrl)
            const image = new Image();
            const imageCanvas = document.getElementById('imageCanvas');
            imageCanvas.style.backgroundImage = `url(${imageUrl})`;
            imageCanvas.style.backgroundRepeat = 'no-repeat';
            
              image.onload = () => {
                const imageWidth = Math.floor(image.width / Grid.squareSize);
                const imageHeight = Math.floor(image.height / Grid.squareSize);
                  
                const mapWidth =  imageWidth;
                const mapHeight = imageHeight;
            
                State.mapArray = State.generateMap(mapWidth, mapHeight);              
          
              };
            
              image.src = imageUrl;            
            
          } catch (error) {
            alert("Error reading JSON file.");
            console.error('Error reading JSON:', error);
          }
        };
        reader.readAsText(file);
      }
  }

  handleSaveButtonClick() {

    const clickSound = document.getElementById('clickSound');        
        clickSound.currentTime = 1.5; // Rewind the sound to the beginning
        clickSound.play(); // Play the sound

    const currentData = State.mapArray;
    if (currentData) {
      State.exportJSONData(currentData); 
      console.log(currentData[0])     
    } else {
      alert("No data to export.");
    }
  }

  handleAddButtonClick() {
  State.addtoMap()
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

};

const toolbar = new Toolbar();
toolbar.init(); // Initialize the toolbar

export default toolbar;
