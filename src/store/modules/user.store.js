import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
import router from './../../router'
import { fb } from "@/firebase"
const store = {
  state: {
    user: null,
    access_token: ''
  },
  mutations: {
    SetAccessToken(state, data) {
      state.access_token = data;
    },
    SetUser(state, data) {
      state.user = data;
    },
  },
  actions: {
    Login({ state, commit, dispatch }, data) {
      // console.log("login ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/login`, { "username": data.username, "password": data.password, "type": data.type }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          let res = response.data.success.data
          sessionStorage.setItem('info', JSON.stringify(res))
          sessionStorage.setItem('token_seesion', res.access_token)
          commit("SetUser", res)
          commit("SetAccessToken", res.access_token)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    LogOut({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        sessionStorage.removeItem("token_seesion")
        sessionStorage.removeItem("info")
        commit('SetAccessToken', '');
        commit('SetUser', null);
        resolve();
      })
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    access_token(state) {
      return state.access_token;
    },
  }
}

export default store;