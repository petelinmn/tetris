const BODIES_BASE = {
    UglyShape: [
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
    ],
    IShape: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    ZShapeLeft: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
    ],
    ZShapeRight: [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
    ],
    LShapeRight: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
    ],
}

class Figure {
    constructor() {
        while (true) {
            for (var type in BODIES_BASE) {
                if(Math.random() > 0.9) {
                    this._shape = BODIES_BASE[type]
                }
            }

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
        this.height = 35;
        this.figureHeight = 9;
        this.figureLeft = 8;

        this.gravityInterval = 500;


        this.renderHandle = renderHandle;

        setInterval(this.gravityPowerCycle.bind(this), this.gravityInterval);
    }

    gravityPowerCycle() {



        this.figureHeight++;
        this.renderHandle(this.body);
    }

    touchGround() {

    }

    get body() {
        let b = [];
        for(let j = 0; j < this.height; j++) {
            let row = [];
            for(let i = 0; i < this.width; i++) {
                if(this.figure &&
                    (j >= this.figureHeight &&
                    j <= this.figureHeight + this.figure.height) &&
                    (i >= this.figureLeft &&
                    i <= this.figureLeft + this.figure.width) &&
                    this.figure.body[j - this.figureHeight] &&
                        this.figure.body[j - this.figureHeight][i - this.figureLeft]
                ) {
                    row.push(1);
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
        this.renderHandle(this.body);
    }

    rotateRight() {
        this.figure.rotateToRight();
        this.renderHandle(this.body);
    }
    moveLeft() {
        this.figureLeft--;
        this.renderHandle(this.body);
    }
    moveRight() {
        this.figureLeft++;
        this.renderHandle(this.body);
    }
    moveUp() {
        this.figureHeight--;
        this.renderHandle(this.body);
    }
    moveDown() {
        this.figureHeight++;
        this.renderHandle(this.body);
    }

}
