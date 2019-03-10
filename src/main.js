import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import api from './api';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
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


