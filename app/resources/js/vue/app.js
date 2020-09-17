import Vue from 'vue';

import appRoot from './components/app-root.vue'

let app = new Vue({
    el: '#app',
    components: {
        'app-root': appRoot
    }
});

export default app;