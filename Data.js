const Data = {
    generateJSONData(numEntries, gridSize) {
      const newData = [];
  
      for (let i = 0; i < numEntries; i++) {
        const row = Math.floor(i / gridSize); // Calculate row based on index
        const col = i % gridSize; // Calculate column based on index
  
        newData.push({
          x: col * 50, // Adjust the positioning and size of each square
          y: row * 50, // Adjust the positioning and size of each square
          name: `Item ${i + 1}`,
          fill: this.getRandomColor(), // Use this.getRandomColor()
        });
      }
  
      return newData;
    },
  
    getRandomColor() {
      const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    },
  
    exportJSONData(data) {
        const fileName = prompt("Enter a file name:", "data.json");
        if (!fileName) {
          return; // User canceled or provided an empty name
        }
    
        const jsonContent = JSON.stringify(data, null, 2); // Prettify the JSON
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
    };
    
    export default Data;
    
   
  
  