import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import api from './api';

Vue.config.productionTip = false;
api.authenticate('public', 'public')
    .then(() => {
        /**
         * @type ApiClient
         */
        Vue.prototype.$api = api;
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app');
    });


