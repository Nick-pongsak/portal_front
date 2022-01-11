import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app.store'
import user from './modules/user.store'

export default new Vuex.Store({
  modules: {
    app,
    user,
  }
})
