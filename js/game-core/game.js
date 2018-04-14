const BODIES_BASE = {
    UglyShape: [
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
    ],
    IShape: [
        [1],
        [1],
        [1],
        [1],
    ],
    ZShapeLeft: [
        [1, 0],
        [1, 1],
        [0, 1],
    ],
    ZShapeRight: [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
    ],
    LShapeRight: [
        [0, 1],
        [0, 1],
        [1, 1],
    ],
}

class Figure {
    constructor() {
        this._shape = BODIES_BASE.LShapeRight;
        this.body = this._shape;
    }

    rotateToRight() {
        let newBody = [];
        for(let x = 0;  x < this.body[0].length; x++) {
            let newRow = [];
            for(let y = this.body.length - 1; y >= 0; y --) {
                newRow.push(this.body[y][x]);
            }
            newBody.push(newRow);
        }
        this.body = newBody;
    }

    rotateToLeft() {
        let newBody = [];
        for(let x = this.body[0].length - 1;  x >= 0; x--) {
            let newRow = [];
            for(let y = 0; y < this.body.length; y ++) {
                newRow.push(this.body[y][x]);
            }
            newBody.push(newRow);
        }
        this.body = newBody;
    }
}

const CELL_TYPE = {
    EMPTY: "EMPTY",
    FIGURE: "FIGURE",
    HEAP: "HEAP"
}

class GameArea {
    constructor(renderHandle) {

        this.figure = new Figure();

        this.width = 15;
        this.heigth = 25;
        this.figureHeight = 10;
        this.figureLeft = 5;

        this.renderHandle = renderHandle;
    }

    get body() {
        let b = [];
        for(let i = 0; i < this.width; i++) {
            let row = [];
            for(let j = 0; j < this.heigth; j++) {
                //if(this.figure)
                row.push({
                    TYPE: CELL_TYPE.EMPTY
                });
            }
            b.push(row);
        }
    }

    rotateLeft() {
        this.figure.rotateToLeft();
        console.log(this.figure.body);
        this.renderHandle(this.figure.body);
    }

    rotateRight() {
        this.figure.rotateToRight();
        console.log(this.figure.body);
        this.renderHandle(this.figure.body);
    }

    goDown() {
        console.log('goDown');
    }

}


class Program {
    main() {
        console.clear();

        let gameArea = new GameArea();

        /*let f = new Figure();
        f.rotateToRight();
        f.rotateToRight();
        f.rotateToRight();
        f.rotateToRight();
        f.rotateToLeft();
        f.rotateToLeft();
        f.rotateToLeft();
        f.rotateToLeft();*/
    }
}


