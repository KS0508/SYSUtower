import Vue from 'vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import router from './router';
import store from './store';
import request from './request';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(request);

new Vue({
  router,
  store,
  request,
  render: h => h(App),
}).$mount('#app');
