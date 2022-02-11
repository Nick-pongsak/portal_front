import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
import router from './../../router'
import { fb } from "@/firebase"
const store = {
  state: {
    user: null,
    role: null,
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODJcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDQ1NTEyMzUsImV4cCI6MTY0NDU4NzIzNSwibmJmIjoxNjQ0NTUxMjM1LCJqdGkiOiJCUkx1dFN3UmlyOVdXNTdhIiwic3ViIjoxMywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.F_T8qG5_X4mpepSpvAoHFPAQhykcFe6vNQ0FkJI2ePo',
    approval: null,
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
      console.log("login ==>", JSON.stringify(data))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/api/auth/login`, { "username": data.username, "password": data.password, "type": data.type }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          let res = response.data.data
          dispatch("SetAccessToken", res.access_token)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    LogOut({ state, commit, dispatch }) {
      /*
      return new Promise((resolve, reject) => {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("role")
        localStorage.removeItem("emp_info")
        localStorage.removeItem("countTab")
        localStorage.removeItem("log_time")
        localStorage.removeItem("fetch_time")
        localStorage.removeItem("fetchMain")
        sessionStorage.removeItem("token_seesion")
        localStorage.removeItem("prd_treeview")
        localStorage.removeItem("chn_treeview")
        localStorage.removeItem("target_year")
        localStorage.removeItem("module")
        commit('SetAccessToken', '');
        fb.auth().signOut().then(() => {
          localStorage.removeItem("auth_firebase")
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
        resolve();
      })
      */
    },
    checkServ({ }) {
      // return new Promise((resolve, reject) => {
      //   axios.get(`${url}/api/server/info`, {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }).then(response => {
      //     resolve(response.data);
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },
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