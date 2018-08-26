
class Figure {
    constructor(X = 10, Y = 10) {
        let count = 0;
        let selectedShape;
        for (let prop in BODIES_BASE)
            if (Math.random() < 1 / ++count)
                selectedShape = prop;

        this.FIGURE_SIZE = 5;

        this.position = {
            X: X,
            Y: Y
        }

        this._shape = BODIES_BASE[selectedShape];

        this._changed = true;

    }


    _calculateProperties() {

    }

    rotateToRight() {
        let newShape = [];
        for(let x = 0;  x < this._shape[0].length; x++) {
            let newRow = [];
            for(let y = this._shape.length - 1; y >= 0; y --) {
                newRow.push(this._shape[y][x]);
            }
            newShape.push(newRow);
        }

        this._shape = newShape;
    }

    rotateToLeft() {
        let newShape = [];
        for(let x = this._shape[0].length - 1;  x >= 0; x--) {
            let newRow = [];
            for(let y = 0; y < this._shape.length; y ++) {
                newRow.push(this._shape[y][x]);
            }
            newShape.push(newRow);
        }

        this._shape = newShape;
    }

    get body() {
        return this._shape;
    }

    get width() {
        return this._shape[0].length;
    }

    get height() {

        let zeroRowsCount = 0;
        for(let j = 0; j < this._shape.length; j++) {
            let isZeroRow = true;
            for (let i = 0; i < this._shape[0].length && isZeroRow; i++) {
                if(this._shape[j][i])
                    isZeroRow = false;
            }

            if(isZeroRow)
                zeroRowsCount++;
        }

        return this._shape.length - zeroRowsCount;
    }
}
