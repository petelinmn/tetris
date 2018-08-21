Vue.component('todo-item', {
    props: ['msg'],
    template: '<div>{{msg}}</div>'
});

let App = new Vue({

    template:
        `<div>
            <table id="battlefield"><tbody>
                <tr v-for="row in message">
                    <td v-bind:class="{ figure: cell }" v-for="cell in row">
                     {{cell}}
                    </td>
                </tr>
            </tbody></table>
        </div>
        `,
    el: '#app',
    data: function () {
        return {
            message: 'Hello!'
        }
    },
    methods: {
        render: function (gameData) {
            this.message = gameData;
        },
        moveLeft: function () {
            if(this.$game && this.$game.moveLeft)
                this.$game.moveLeft();
        },
        moveRight: function () {
            if(this.$game && this.$game.moveRight)
                this.$game.moveRight();
        },
        moveUp: function () {
            if(this.$game && this.$game.moveUp)
                this.$game.moveUp();
        },
        moveDown: function () {
            if(this.$game && this.$game.moveDown)
                this.$game.moveDown();
        },
        rotateLeft: function () {
            if(this.$game && this.$game.rotateLeft)
                this.$game.rotateLeft();
        },
        rotateRight: function () {
            if(this.$game && this.$game.rotateRight)
                this.$game.rotateRight();
        }
    },
    beforeMount: function () {
        this.$game = new GameArea(this.render);
    }
});

window.document.body.addEventListener('keydown', function (e) {
    if(e && e.key && App) {
        switch (e.key) {
            case "Insert":
                if(App.rotateLeft)
                    App.rotateLeft();
                break;
            case "Delete":
                if(App.rotateRight())
                    App.rotateRight();
                break;
            case "ArrowUp":
                if(App.moveUp)
                    App.moveUp();
                break;
            case "ArrowDown":
                if(App.moveDown())
                    App.moveDown();
                break;
            case "ArrowLeft":
                if(App.moveLeft)
                    App.moveLeft();
                break;
            case "ArrowRight":
                if(App.moveRight)
                    App.moveRight();
                break;
        }
    }
});
