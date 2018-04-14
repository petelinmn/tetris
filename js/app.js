Vue.component('todo-item', {
    template: '<li>Это одна задача в списке</li>'
})

new Vue({
    template: "<todo-item />",
    el: '#app',
    data: {
        message: 'Привет Vue!'
    }
})

new Program().main();