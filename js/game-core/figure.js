
class Figure {
   constructor(X = 10, Y = 10) {
     let count = 0;
     let selectedShape;
     for (let prop in BODIES_BASE)
     {
         if (Math.random() < 1 / ++count)
            selectedShape = prop;
     }

      this.FIGURE_SIZE = 5;

      this.position = {
         X: X,
         Y: Y
      };

      this._shape = BODIES_BASE[selectedShape];

      this._changed = true;

       this._calculateProperties()
   }

   _calculateProperties() {
       this._calculatePaddings();
   }

   _calculatePaddings() {
       let deltaLeft = this.FIGURE_SIZE;
       let deltaRight = this.FIGURE_SIZE;
       let deltaTop = -1;
       let deltaBottom = -1;

       for (let y = 0; y < this.FIGURE_SIZE; y++) {
           for (let x = 0;  x < this.FIGURE_SIZE; x++) {
               if (this._shape[y][x]) {
                   if (deltaLeft > x)
                   {deltaLeft = x;}

                   if (deltaTop < 0)
                   {deltaTop = y;}
               }
           }
       }

       for (let y = this.FIGURE_SIZE - 1; y >= 0; y--) {
           for (let x = this.FIGURE_SIZE - 1;  x >= 0; x--) {
               if (this._shape[y][x]) {
                   if (deltaRight > this.FIGURE_SIZE - 1 - x)
                   {deltaRight = this.FIGURE_SIZE - 1 - x;}

                   if (deltaBottom < 0)
                   {deltaBottom = this.FIGURE_SIZE - 1 - y;}
               }
           }
       }

       this._deltaLeft = deltaLeft;
       this._deltaRight = deltaRight;
       this._deltaTop = deltaTop;
       this._deltaBottom = deltaBottom;
   }

   rotate() {
      let newShape = [];

      for (let x = 0;  x < this.FIGURE_SIZE; x++) {
         let newRow = [];
         for (let y = this.FIGURE_SIZE - 1; y >= 0; y--) {
            newRow.push(this._shape[y][x]);
         }
         newShape.push(newRow);
      }

      this._shape = newShape;

      this._calculateProperties();
   }

   rotateBack() {
      let newShape = [];
      for (let x = this.FIGURE_SIZE - 1;  x >= 0; x--) {
         let newRow = [];
         for (let y = 0; y < this.FIGURE_SIZE; y++) {
            newRow.push(this._shape[y][x]);
         }
         newShape.push(newRow);
      }

      this._shape = newShape;
      this._calculateProperties();
   }

   get body() {
      return this._shape;
   }

   get deltaTop() {
       return this._deltaTop;
   }

    get deltaBottom() {
        return this._deltaBottom;
    }

    get deltaRight() {
        return this._deltaRight;
    }

    get deltaLeft() {
        return this._deltaLeft;
    }
}
