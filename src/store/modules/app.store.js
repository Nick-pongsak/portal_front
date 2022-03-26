import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;
import Vue from 'vue'
import router from './../../router'


const store = {
  state: {
    loading: false,
    loadHome: false,
    language: '',

  },
  mutations: {
    SetLoading(state, data) {
      state.loading = data;
    },
    SetLoadHome(state, data) {
      state.loadHome = data;
    },
    SetLanguage(state, data) {
      state.language = data;
    }
  },
  actions: {
    getHomeData({ commit }, data) {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    saveHome({ commit }, data) {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    updateProfile({ commit }, data) {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    deletePicProfile({ commit }, data) {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    uploadPicProfile({ commit }, data) {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    changePassword({ commit }, data) {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    changePasswordNew({ commit }, data) {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    CheckUserAccess({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("check-authen-app ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/` + data.api, data, {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    UpdateUsernameSSO({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("update-username-sso ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-username-sso`, data, {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    UpdateLanguage({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("update-language ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-language`, data, {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    uploadCsv({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("import-user ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/import-user`, data, {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    fetchCsv({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("get-temporary ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/get-temporary`, data, {
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
              // router.push('/');
              commit('SetDialogExpire', true)
            }
          }
          reject(error)
        })
      })
    },
    saveCsv({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("import-temp-to-users ==>")
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/import-temp-to-users`, data, {
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
              // router.push('/');
              commit('SetDialogExpire', true)
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
    isLanguage(state) {
      return state.language;
    },
    loadHome(state) {
      return state.loadHome;
    },
  }
}

export default store;