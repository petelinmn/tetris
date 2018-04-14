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
        this._shape = BODIES_BASE.ZShapeRight;
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
        console.log(newBody);
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
        console.log(newBody);
    }
}


class GameArea {
    constructor() {
        this.width = 15;
        this.heigth = 25;

    }
}


class Program {
    main() {
        console.clear();

        let f = new Figure();
        f.rotateToRight();
        f.rotateToRight();
        f.rotateToRight();
        f.rotateToRight();
        f.rotateToLeft();
        f.rotateToLeft();
        f.rotateToLeft();
        f.rotateToLeft();
    }
}


