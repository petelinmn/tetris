
class GameArea {
    constructor(renderHandle) {

        this.width = 15;
        this.height = 9;

        this.figure = new Figure(10, this.height);

        this.gravityInterval = 500;

        if(window && window.document && window.document.body)
            window.document.body.addEventListener('keydown', this.onKeyDown.bind(this));

        this.renderHandle = renderHandle;

        this.isFigureSquare = this.isFigureSquare.bind(this);

        //setInterval(this.gravityPowerCycle.bind(this), this.gravityInterval);
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
        this.figure.position.Y--;
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
        if(this.figure.position.Y == 0)
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

    isLeftEdge(i, j) {
        let deltaY = this.figure.position.Y - j;
        let deltaX = i - this.figure.position.X;


        return deltaX == 0 && deltaY >= 0 && deltaY < 5;
    }

    isRightEdge(i, j) {
        let deltaY = this.figure.position.Y - j;
        let deltaX = i - this.figure.position.X;


        return deltaX == 4 && deltaY >= 0 && deltaY < 5;
    }

    isFigureSquare(i, j) {
        // let vComparing =
        //     j <= this.figure.position.Y &&
        //     j >= this.figure.height - this.figure.position.Y;
        //
        // let hComparing =
        //     i >= this.figure.position.X &&
        //     i <= this.figure.position.X + this.figure.width;


        let figureComparing =
            this.figure.body[this.figure.position.Y - j ] &&
            this.figure.body[this.figure.position.Y - j][i - this.figure.position.X];

        return /*vComparing && hComparing &&*/ figureComparing;
    }

    get body() {
        let body = [];
        for(let j = this.height - 1; j >= 0; j--) {
            let row = [];
            for(let i = 0; i < this.width; i++) {

                if(j == this.height - 1 && i > 5) {
                    let t = 12;
                }

                row.push({
                    val: /*this.heap[j] && this.heap[j][i] ? 2 : */this.isFigureSquare(i, j) ? 1 : 0,
                    i: i,
                    j: j,
                    leftEdge: this.isLeftEdge(i, j),
                    rightEdge: this.isRightEdge(i, j)
                    }
                );
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
        this.figure.position.Y++;
        this.renderHandle(this.gameData);
    }
    moveDown() {
        this.figure.position.Y--;
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


