import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import {registerPlugins} from "./plugins";
import {createStore} from './store';
import routerModule from "./router";
import {sync} from 'vuex-router-sync';

Vue.config.productionTip = false
registerPlugins(Vue);
const store = createStore();
const router = routerModule.getInstance(store)
// createRouter(vuetify, store)
sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
