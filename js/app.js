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
        go: function () {
            this.message = 'GOOOOOO!';
        },
        render: function (gameData) {
            console.log(gameData);
            this.message = gameData;
        },
        rotateLeft: function () {
            if(this.$game && this.$game.rotateLeft)
                this.$game.rotateLeft();
        },
        rotateRight: function () {
            if(this.$game && this.$game.rotateRight)
                this.$game.rotateRight();
        },
        goDown: function () {
            if(this.$game && this.$game.rotateRight)
                this.$game.goDown();
        }
    },
    beforeMount: function () {
        this.$game = new GameArea(this.render);
    }
});

window.document.body.onkeydown = function (e) {
    if(e && e.key && App) {
        switch (e.key) {
            case "ArrowLeft":
                if(App.rotateLeft)
                    App.rotateLeft();
                break;
            case "ArrowRight":
                if(App.rotateRight)
                    App.rotateRight();
                break;
            case "ArrowDown":
                if(App.goDown)
                    App.goDown();
                break;
        }
    }
};
