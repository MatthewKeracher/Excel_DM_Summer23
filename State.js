class State {
    constructor() {
      this.MasterArray = [];
      this.init();
    }
  
    generateJSONData(numEntries, gridSize) {
      const rows = Array.from({ length: numEntries }, (_, x) => {
        const columns = Array.from({ length: numEntries }, (_, y) => ({
          name: `Item ${x} - ${y}`,
          fill: this.getRandomColor(),
        }));
        return columns;
      });
  
      return rows;
    }
  
    getRandomColor() {
      const colors = ['red', 'blue', 'green', 'cyan', 'orange', 'purple'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
  
    exportJSONData(data) {
      const fileName = prompt('Enter a file name:', 'data.json');
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
    }
  
    
  
    
  }
  
  export default State;
  