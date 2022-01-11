import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.config.productionTip = false

import Axios from 'axios';
import vuetify from './plugins/vuetify';
Vue.prototype.$axios = Axios;

const EventBus = new Vue();
Vue.prototype.$eventbus = EventBus;

// import './firebase';
import { rtdbPlugin as VueFire } from 'vuefire'
Vue.use(VueFire)
Vue.use(VueMaterial)

import './filters';
import './global';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
