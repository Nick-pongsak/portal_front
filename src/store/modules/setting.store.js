import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;
import router from '../../router'

const store = {
  state: {
    dialog_profile: false,
    dialog_expire: false,
    dialog_error: false,
  },
  mutations: {
    SetDialogProfile(state, data) {
      state.dialog_profile = data;
    },
    SetDialogExpire(state, data) {
      state.dialog_expire = data;
    },
    SetDialogError(state, data) {
      state.dialog_error = data;
    },
  },
  actions: {
    addAppList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("add-application ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/add-application`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    updateAppList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("update-application ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-application`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    deleteAppList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("delete-application ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/delete-application`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    getAppList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("application-detail ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/application-detail`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    getType({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("get-category ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/get-category`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    deleteType({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("delete-category ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/delete-category`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    addType({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("add-category ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/add-category`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    updateType({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("update-category ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-category`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    groupDetail({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("group-detail ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/group-detail`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    AddGroupList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("add-group ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/add-group`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    updateGroupList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("update-group ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-group`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    deleteGroupList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("delete-group ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/delete-group`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    getGroupList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("get-group-app ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/get-group-app`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    getUserList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("get-user-list ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/get-user-list`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    getDroupdownGroup({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("dropdown-group ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/dropdown-group`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            commit('SetDialogExpire', true)
            // router.push('/');
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    searchEmpLdap({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("search-emp-ldap ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/search-emp-ldap`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    registerUser({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("register ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/register`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    delteUser({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("delete-user ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/delete-user`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    updateUser({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("update-user ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-user`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    getUserProfile({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("user-profile ==>", JSON.stringify(data))
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/user-profile`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            // router.push('/');
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
            commit('SetDialogError', true)
          }
          reject(error)
        })
      })
    },
    acceptTerm({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("user-accept ==>")
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/user-accept`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
          }
          reject(error)
        })
      })
    },
    fetchTerm({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("condition-list ==>")
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/condition-list`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
          }
          reject(error)
        })
      })
    },
    deleteTerm({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("delete-condition ==>")
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/delete-condition`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
          }
          reject(error)
        })
      })
    },
    addTerm({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("add-condition ==>")
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/add-condition`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
          }
          reject(error)
        })
      })
    },
    updateTerm({ commit }, data) {
      commit('SetLoading', true)
      if (debug == 'debug') {
        console.log("update-condition ==>")
      }
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-condition`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getters.access_token}`
          }
        }).then(res => {
          commit('SetLoading', false)
          resolve(res.data.success)
        }).catch(error => {
          commit('SetLoading', false)
          if (error && error.response && error.response.status === 401) {
            commit('SetDialogExpire', true)
          } else if (error && error.response && error.response.status === 500) {
          }
          reject(error)
        })
      })
    },
  },
  getters: {
    dialog_profile(state) {
      return state.dialog_profile;
    },
    dialog_expire(state) {
      return state.dialog_expire;
    },
    dialog_error(state) {
      return state.dialog_error;
    },
  }
}

export default store;