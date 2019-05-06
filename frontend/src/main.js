import Vue from 'vue';

import Beufy from 'buefy';
import 'buefy/dist/buefy.css';
import '@mdi/font/css/materialdesignicons.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Beufy);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
