import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
import router from '../../router'

const store = {
  state: {
    // user: null,
    // role: null,
    // access_token: '',
    // approval: null,
  },
  mutations: {
    // SetAccessToken(state, data) {
    //   state.access_token = data;
    // },
    // SetUser(state, data) {
    //   state.user = data;
    // },
  },
  actions: {
    addAppList({ state, commit, dispatch }, data) {
      console.log("add-application ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/add-application`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          resolve(res.data.success)
        }).catch(error => {
          // commit('SetLoading', false)
          reject(error)
        })
      })
    },
    updateAppList({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-application`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          resolve(res.data.success)
        }).catch(error => {
          // commit('SetLoading', false)
          reject(error)
        })
      })
    },
    getAppList({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/application-detail`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          resolve(res.data.success)
        }).catch(error => {
          // commit('SetLoading', false)
          reject(error)
        })
      })
    },
    getType({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/get_category`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          resolve(res.data.success)
        }).catch(error => {
          // commit('SetLoading', false)
          reject(error)
        })
      })
    },
    deleteType({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/delete_category`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          resolve(res.data.success)
        }).catch(error => {
          // commit('SetLoading', false)
          reject(error)
        })
      })
    },
    addType({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/add_category`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          resolve(res.data.success)
        }).catch(error => {
          // commit('SetLoading', false)
          reject(error)
        })
      })
    },
    updateType({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update_category`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          resolve(res.data.success)
        }).catch(error => {
          // commit('SetLoading', false)
          reject(error)
        })
      })
    },

  },
  getters: {
    // user(state) {
    //   return state.user;
    // },
    // access_token(state) {
    //   return state.access_token;
    // },
  }
}

export default store;