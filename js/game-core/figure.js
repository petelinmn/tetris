
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
