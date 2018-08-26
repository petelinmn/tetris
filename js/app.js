let App = new Vue({
    template:
        `<div>
            <table id="battlefield">
                <tbody>
                    <tr v-for="row in gameData.body">
                        <td v-bind:class="{ figure: cell.val == 1, heap: cell.val == 2, leftEdge: cell.leftEdge, rightEdge: cell.rightEdge }" v-for="cell in row">
                         {{ cell.i + ',' + cell.j }}
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
