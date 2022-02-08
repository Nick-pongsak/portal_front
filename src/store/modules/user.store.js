import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
import router from './../../router'
import { fb } from "@/firebase"
const store = {
  state: {
    user: null,
    role: null,
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODJcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDQzMTMzOTcsImV4cCI6MTY0NDM0OTM5NywibmJmIjoxNjQ0MzEzMzk3LCJqdGkiOiJHY0lvN1lOcEYzQmNkZWhuIiwic3ViIjoxMywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.ElxWMGJ-M79O3l11fpk7ZtUdMGxqZ2d_oMS5cCyceu4',
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
      /*
      return new Promise((resolve, reject) => {
        axios.post(`${url}/api/auth/login`, { "username": data.username, "password": data.password, "menu": this.getters.menuDisplay }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          let res = response.data.data
          dispatch("reFreshToken", res.access_token)
          localStorage.setItem('name', res.emp_info.firstname_en)
          commit('SetUser', res.emp_info)
          localStorage.setItem('emp_info', JSON.stringify(res.emp_info))
          localStorage.setItem('log_time', res.log_time)
          localStorage.setItem('target_year', res.target_year)
          sessionStorage.setItem('token_seesion', res.access_token)
          fb.auth().signInWithCustomToken(res.fs_access_token)
            .then((user) => {
              let auth_staus = user.operationType == 'signIn' ? true : false
              localStorage.setItem("auth_firebase", auth_staus)
              if (res.emp_info.roles.length == 1) {
                if (res.emp_info.roles.length == 1) {
                  commit('SetRole', res.emp_info.roles[0])
                  router.push('/dashboard')
                }
              }
            })
            .catch((error) => {
              localStorage.setItem("auth_firebase", false)
              if (res.emp_info.roles.length == 1) {
                if (res.emp_info.roles.length == 1) {
                  commit('SetRole', res.emp_info.roles[0])
                  router.push('/dashboard')
                }
              }
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode + " : " + errorMessage)
            });
          resolve(response.data);
        }).catch(error => {
          localStorage.setItem("auth_firebase", false)
          reject(error)
        })
      })
      */
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
    CheckAuthorization({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        if (state.access_token === '' && localStorage.getItem("token")) {
          commit("SetAccessToken", localStorage.getItem("token"))
        }
      })
    },
    checkServ({ }) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/api/server/info`, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })
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