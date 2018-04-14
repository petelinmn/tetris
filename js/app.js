Vue.component('todo-item', {
    props: ['msg'],
    template: '<div>{{msg}}</div>'
});

let App = new Vue({

    template:
        `<div>
            <div id="root">
                <todo-item v-bind:msg="message"/>
                <button v-on:click="go">GOOO</button>
            </div>
            <ol v-on:click="rotateRight">
                <li>Item1</li>
                <li>Item2</li>
                <li>Item3</li>
            </ol>
        </div>
        `,
    el: '#app',
    data: function () {
        return {
            message: 'Привет Vue!'
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
