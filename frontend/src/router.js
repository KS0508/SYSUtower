import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import FullText from './views/FullText.vue';
import FullPage from './views/FullPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/full/:tabId',
      component: FullText,
      props: true,
    },
    {
      path: '/page/:tabId',
      component: FullPage,
      props: true,
    }
  ],
});
