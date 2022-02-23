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
          if (error && error.response && error.response.status === 500) {
            if (error.response.data.message == "Token has expired") {
              router.push('/');
            }
          }
          reject(error)
        })
      })
    },
    saveHome({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("save-order ==>", JSON.stringify(data))
      }
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
          if (error && error.response && error.response.status === 500) {
            if (error.response.data.message == "Token has expired") {
              router.push('/');
            }
          }
          reject(error)
        })
      })
    },
    updateProfile({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("update-profile ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-profile`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 500) {
            if (error.response.data.message == "Token has expired") {
              router.push('/');
            }
          }
          reject(error)
        })
      })
    },
    deletePicProfile({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("delete-image ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/delete-image`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 500) {
            if (error.response.data.message == "Token has expired") {
              router.push('/');
            }
          }
          reject(error)
        })
      })
    },
    uploadPicProfile({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("upload-image ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/upload-image`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 500) {
            if (error.response.data.message == "Token has expired") {
              router.push('/');
            }
          }
          reject(error)
        })
      })
    },
    changePassword({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("change-password ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/change-password`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 500) {
            if (error.response.data.message == "Token has expired") {
              router.push('/');
            }
          }
          reject(error)
        })
      })
    },
    changePasswordNew({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("change-password-new ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/change-password-new`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 500) {
            if (error.response.data.message == "Token has expired") {
              router.push('/');
            }
          }
          reject(error)
        })
      })
    },
    CheckUserAccess({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("check-user-access ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/check-user-access`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 500) {
            if (error.response.data.message == "Token has expired") {
              router.push('/');
            }
          }
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