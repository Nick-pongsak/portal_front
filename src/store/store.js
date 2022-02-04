import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app.store'
import user from './modules/user.store'
import setting from './modules/setting.store'

export default new Vuex.Store({
  modules: {
    app,
    user,
    setting,
  }
})
