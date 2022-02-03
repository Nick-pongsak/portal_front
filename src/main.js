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


import 'vue-dnd-zone/vue-dnd-zone.css'
import VueDndZone from 'vue-dnd-zone'
Vue.use(VueDndZone)

import ImageUploader from 'vue-image-upload-resize'
Vue.use(ImageUploader);
// import './firebase';
import { rtdbPlugin as VueFire } from 'vuefire'
Vue.use(VueFire)
Vue.use(VueMaterial)

import './filters';
import './global';

import VueI18n from 'vue-i18n'
import locales from './locales'
Vue.use(VueI18n)
var i18n = new VueI18n({
  locale: 'th',
  // locale: Vue.config.lang,
  messages: locales
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
