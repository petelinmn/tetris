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
        [0, 1],
        [1, 1],
        [1, 0],
    ],
    LShapeRight: [
        [0, 1],
        [0, 1],
        [1, 1],    ],
}

class Figure {
    constructor() {
var q = 0;
        while (true) {
            for (var type in BODIES_BASE) {
                console.log(BODIES_BASE[type]);
                if(Math.random() > 0.9) {
                    this._shape = BODIES_BASE[type]
                }
            }
            console.log(this._shape);
            this._shape = BODIES_BASE.ZShapeLeft;
            if(this._shape)
                break;
        }

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

    get width() {
        return this.body[0].length;
    }

    get height() {
        return this.body.length;
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
        console.log(this.width);
        console.log(this.heigth);
        console.log(this.figureHeight);
        console.log(this.figureLeft);
        console.log(this.figure);
        console.log(this.figure.width);
        console.log(this.figure.height);
        for(let j = 0; j < this.heigth; j++) {
            let row = [];
            for(let i = 0; i < this.width; i++) {
                if(this.figure &&
                    (j >= this.figureHeight &&
                    j <= this.figureHeight + this.figure.width) &&
                    (i >= this.figureLeft &&
                    i <= this.figureLeft + this.figure.height) &&
                    this.figure.body[j - this.figureHeight] &&
                        this.figure.body[j - this.figureHeight][i - this.figureLeft]
                ) {
                        row.push(1);
                        console.log(i);
                    console.log(j);
                }
                else {
                    row.push(0);
                }
            }
            b.push(row);
        }
        return b;
    }

    rotateLeft() {
        this.figure.rotateToLeft();
        console.log(this.figure.body);
        this.renderHandle(this.body);
    }

    rotateRight() {
        this.figure.rotateToRight();
        console.log(this.figure.body);
        this.renderHandle(this.body);
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


