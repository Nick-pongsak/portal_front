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
    getHomeData({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("application-user ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/application-user`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          reject(error)
        })
      })
    },
    saveHome({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("save-order ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/save-order`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          reject(error)
        })
      })
    },

  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
  }
}

export default store;