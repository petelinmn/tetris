const BODIES_BASE = {
    UglyShape: [
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
    ],
    IShape: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
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
    TShapeRight: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]
}

class Figure {
    constructor(X = 10, Y = 10) {
        let count = 0;
        let selectedBody;
        for (var prop in BODIES_BASE)
            if (Math.random() < 1 / ++count)
                selectedBody = prop;

        this.position = {
            X: X,
            Y: Y
        }

        this.body = BODIES_BASE[selectedBody];
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

        let zeroRowsCount = 0;
        for(let j = 0; j < this.body.length; j++) {
            let isZeroRow = true;
            for (let i = 0; i < this.body[0].length && isZeroRow; i++) {
                if(this.body[j][i])
                    isZeroRow = false;
            }

            if(isZeroRow)
                zeroRowsCount++;
        }

        return this.body.length - zeroRowsCount;
    }
}

class GameArea {
    constructor(renderHandle) {

        this.width = 15;
        this.height = 9;

        this.figure = new Figure(10, 0);

        this.gravityInterval = 500;

        if(window && window.document && window.document.body)
            window.document.body.addEventListener('keydown', this.onKeyDown.bind(this));

        this.renderHandle = renderHandle;

        this.isFigureSquare = this.isFigureSquare.bind(this);

        setInterval(this.gravityPowerCycle.bind(this), this.gravityInterval);
    }

    // get heap() {
    //     if(!this._heap) {
    //         this._heap = [];
    //         for (let j = 0; j < this.height; j++) {
    //             let row = [];
    //             for (let i = 0; i < this.width; i++) {
    //                 row.push(0);
    //             }
    //             this._heap.push(row);
    //         }
    //     }
    //
    //     return this._heap;
    // }
    //
    // set heap(value) {
    //     this._heap = value;
    // }

    gravityPowerCycle() {
        this.figure.position.Y++;
        this.renderHandle(this.gameData);

        // if(this.canFigureTouchGround()) {
        //     for(let j = 0; j < this.height; j++) {
        //         let row = this.heap[j];
        //         console.log(row);
        //         for (let i = 0; i < this.width && row; i++) {
        //             if(row[i] && this.isFigureSquare(i, j)) {
        //                 console.error('Фигура наложилась на кучу!');
        //             }
        //
        //             row[i] = row[i] || this.isFigureSquare(i, j) ? 1 : 0
        //         }
        //     }
        //
        //     this.figure = new Figure(10, 0);
        // }
    }

    canFigureTouchGround() {
        if(this.figure.position.Y >= this.height - 1)
            return true;

        // for(let j = this.figure.height - 1; j >= 0; j--) {
        //     for(let i = 0; i < this.figure.width; i++) {
        //         if(this.figure.body[j][i]) {
        //             let row = this.heap[this.figure.position.Y - (this.figure.height - j) + 1];
        //             if(row && row.length && row[i + this.figure.position.X - 1])
        //                 return true;
        //         }
        //     }
        // }
    }

    isFigureSquare(i, j) {
        let vComparing =
            j <= this.figure.position.Y &&
            j >= this.figure.height - this.figure.position.Y;

        let hComparing =
            i >= this.figure.position.X &&
            i <= this.figure.position.X + this.figure.width;

        let figureComparing =
            this.figure.body[this.figure.position.Y - j] &&
            this.figure.body[this.figure.position.Y - j][i - this.figure.position.X];

        return vComparing && hComparing && figureComparing;
    }

    get body() {
        let body = [];
        for(let j = 0; j < this.height; j++) {
            let row = [];
            for(let i = 0; i < this.width; i++) {

                if(j == this.height - 1 && i > 5) {
                    let t = 12;
                }

                row.push(/*this.heap[j] && this.heap[j][i] ? 2 : */this.isFigureSquare(i, j) ? 1 : 0);
            }
            body.push(row);
        }
        return body;
    }

    get gameData() {
        return {
            body: this.body,
            figure: this.figure
        }
    }

    rotateLeft() {
        this.figure.rotateToLeft();
        this.renderHandle(this.gameData);
    }

    rotateRight() {
        this.figure.rotateToRight();
        this.renderHandle(this.gameData);
    }
    moveLeft() {
        this.figure.position.X--;
        this.renderHandle(this.gameData);
    }
    moveRight() {
        this.figure.position.X++;
        this.renderHandle(this.gameData);
    }
    moveUp() {
        this.figure.position.Y--;
        this.renderHandle(this.gameData);
    }
    moveDown() {
        this.figure.position.Y++;
        this.renderHandle(this.gameData);
    }

    onKeyDown(e) {
        if(e && e.key && this) {
            switch (e.key) {
                case "Insert":
                    if(this.rotateLeft)
                        this.rotateLeft();
                    break;
                case "Delete":
                    if(this.rotateRight())
                        this.rotateRight();
                    break;
                case "ArrowUp":
                    if(this.moveUp)
                        this.moveUp();
                    break;
                case "ArrowDown":
                    if(this.moveDown())
                        this.moveDown();
                    break;
                case "ArrowLeft":
                    if(this.moveLeft)
                        this.moveLeft();
                    break;
                case "ArrowRight":
                    if(this.moveRight)
                        this.moveRight();
                    break;
            }
        }
    }
}


