
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

    get heap() {
        if(this._heap)
            return this._heap;

        this._heap = [];
        for (let j = 0; j < this.height; j++) {
            let row = [];
            for (let i = 0; i < this.width; i++) {
                row.push(0);
            }
            this._heap.push(row);
        }

        return this._heap;
    }

    set heap(value) {
        this._heap = value;
    }

    gravityPowerCycle() {
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

        if(this.canFigureTouchGround()) {
            alert('!!!')
        }

        this.figure.position.Y--;
        this.renderHandle(this.gameData);
    }

    canFigureTouchGround() {
        if(this.figure.position.Y + this.figure.deltaBottom == 0)
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

    canFigureTouchLeftWall() {
        return this.figure.position.X + this.figure.deltaLeft - 1 < 0;
    }

    canFigureTouchRightWall() {
        return this.figure.position.X + 6 - this.figure.deltaRight > this.width;
    }

    isLeftEdge(x, y) {
        return this._getDeltaX(x) == 0 && this._getDeltaY(y) >= 0 && this._getDeltaY(y) <= 4;
    }

    isRightEdge(x, y) {
        return this._getDeltaX(x) == 4 && this._getDeltaY(y) >= 0 && this._getDeltaY(y) <= 4;
    }

    isBottomEdge(x, y) {
        return this._getDeltaX(x) >= 0 && this._getDeltaX(x) <= 4 && this._getDeltaY(y) == 4;
    }

    _getDeltaX(x) {
        return x - this.figure.position.X;
    }

    _getDeltaY(y) {
        return this.figure.position.Y - y + 4;
    }

    isFigureSquare(x, y) {
        return this.figure.body[this._getDeltaY(y)] &&
                this.figure.body[this._getDeltaY(y)][this._getDeltaX(x)];
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
                    rightEdge: this.isRightEdge(i, j),
                    bottomEdge: this.isBottomEdge(i, j)
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

    rotateBack() {
        this.figure.rotateBack();
        this.renderHandle(this.gameData);
    }

    rotate() {
        this.figure.rotate();
        this.renderHandle(this.gameData);
    }
    moveLeft() {
        if(this.canFigureTouchLeftWall())
            return;

        this.figure.position.X--;
        this.renderHandle(this.gameData);
    }
    moveRight() {
        if(this.canFigureTouchRightWall())
            return;

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
                    this.rotateBack();
                    break;
                case "Delete":
                    this.rotate();
                    break;
                case "ArrowUp":
                    this.moveUp();
                    break;
                case "ArrowDown":
                    this.moveDown();
                    break;
                case "ArrowLeft":
                    this.moveLeft();
                    break;
                case "ArrowRight":
                    this.moveRight();
                    break;
            }
        }
    }
}


