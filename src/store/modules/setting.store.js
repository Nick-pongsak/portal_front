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
      commit('SetLoading', true)
      console.log("add-application ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/add-application`, data, {
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
    updateAppList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("update-application ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-application`, data, {
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
    deleteAppList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("delete-application ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    getAppList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("application-detail ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    getType({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("get-category ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    deleteType({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("delete-category ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/delete-category`, data, {
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
    addType({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("add-category ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/add-category`, data, {
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
    updateType({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("update-category ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-category`, data, {
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
    groupDetail({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("group-detail ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    AddGroupList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("add-group ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/add-group`, data, {
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
    updateGroupList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("update-group ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-group`, data, {
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
    deleteGroupList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("delete-group ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    getGroupList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("get-group-app ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    getUserList({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("get-user-list ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    getDroupdownGroup({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("dropdown-group ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    searchEmpLdap({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("search-emp-ldap ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    registerUser({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("register ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/register`, data, {
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
    delteUser({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("delete-user ==>", JSON.stringify(data))
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
          reject(error)
        })
      })
    },
    updateUser({ state, commit, dispatch }, data) {
      commit('SetLoading', true)
      console.log("update-user ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-user`, data, {
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
    // user(state) {
    //   return state.user;
    // },
    // access_token(state) {
    //   return state.access_token;
    // },
  }
}

export default store;