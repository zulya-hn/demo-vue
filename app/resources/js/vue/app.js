import Vue from 'vue';

import AppRoot from './components/app-root.vue'

let vm = new Vue({
    el: '#app',
    components: {
        'app-root': AppRoot
    }
});

export default vm;