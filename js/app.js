let App = new Vue({
    template:
        `<div>
            <table id="battlefield">
                <tbody>
                    <tr v-for="row in gameData.body">
                        <td v-bind:class="{ figure: cell == 1, heap: cell == 2 }" v-for="cell in row">
                         {{cell}}
                        </td>
                    </tr>
                </tbody>
            </table>
            {{gameData.figure}}
        </div>
        `,
    el: '#app',
    data: function () {
        return {
            gameData: 'Hello!'
        }
    },
    methods: {
        render: function (gameData) {
            this.gameData = gameData;
        }
    },
    beforeMount: function () {
        this.$game = new GameArea(this.render);
    }
});
