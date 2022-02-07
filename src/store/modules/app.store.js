import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;
import Vue from 'vue'
import router from './../../router'


const store = {
  state: {
    loading: false,

  },
  mutations: {
    SetLoading(state, data) {
      state.loading = data;
    }
  },
  actions: {
    FetchMainData({
      state,
      commit,
      dispatch
    }, data) {
      // TEST
    },

  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
  }
}

export default store;