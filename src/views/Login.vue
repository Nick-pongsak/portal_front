<template>
  <div id="login" v-resize="onResize">
    <div id="login-box" :style="{ transform: tranformScale }">
      <div class="part-top justify-center">
        <div class="logo">
          <img src="@/assets/icons/logo.png" />
        </div>
        <div class="system-name">{{ systemName }}</div>
      </div>
      <div class="part-bottom">
        <form>
          <div class="input-with-icon" :class="{ active: error }">
            <input
              type="text"
              v-model="user.username"
              placeholder="Username"
            />
            <v-icon
              v-text="'mdi-account'"
              style="color:#000000;opacity:0.5;padding-right:8px;"
              size="20"
            ></v-icon>
          </div>
          <div class="input-with-icon" :class="{ active: error }">
            <input
              :type="showpass ? 'text' : 'password'"
              v-model="user.password"
              placeholder="Password"
            />
            <div
              @click="showpass = !showpass"
              style="padding-top: 8px;cursor:pointer"
            >
              <v-icon
                v-text="showpass ? 'mdi-eye-off' : 'mdi-eye'"
                style="color:#000000;opacity:0.5;padding-right:8px;"
                size="20"
              ></v-icon>
            </div>
          </div>
          <v-radio-group
            class="radio-group"
            v-model="radioGroup"
            style="padding-top: 0px;"
          >
            <div
              class="n-body"
              v-for="(row, index) in dataRole"
              :key="row.code"
              :style="{
                'padding-left': index == 0 ? '0px' : '18px'
              }"
            >
              <div style="width:20px">
                <v-radio
                  :color="'#CE1212'"
                  :key="row.code"
                  :value="row.code"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
              </div>
              <div class="n-body_desc">{{ row.title }}</div>
            </div>
          </v-radio-group>
          <div class="login-error" :class="{ active: error }">
            Username or password is incorrect
          </div>
          <button type="submit" @click.prevent="login">LOG IN</button>
          <div class="creater">
            Copyright © 2022 DHA Siamwalla Ltd. All Rights Reserved.
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
var CryptoJS = require('crypto-js')
export default {
  name: 'login',
  components: {},
  data () {
    return {
      showpass: false,
      user: {
        username: '',
        password: ''
      },
      firstname: '',
      error: false,
      radio: false,
      objA: { name: 'a' },
      objB: { name: 'b' },
      radioGroup: 1,
      dataRole: [
        { code: 1, title: 'LDAP(AD)' },
        { code: 0, title: 'Username Portal' }
      ],
      systemName: 'PORTAL',
      err_text: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง',
      tranformScale: 'scale(1)'
    }
  },
  methods: {
    login () {
      var data = this.user.password
      var iv = CryptoJS.lib.WordArray.random(16)
      let keyapp = 'WebPortalKey'
      var encrypted = CryptoJS.AES.encrypt(data, keyapp, {
        iv: iv
      }).toString()

      let result = {
        username: this.user.username,
        password: encodeURI(encrypted),
        type: this.radioGroup
      }
      this.$store
        .dispatch('Login', result)
        .then(res => {
          this.error = false
          this.$router.push('/home')
        })
        .catch(error => {
          if (error && error.response && error.response.status === 400) {
            this.error = true
          }
        })
    },
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      if (x <= 375) {
        this.tranformScale = 'scale(0.5)'
      } else if (x > 375 && x <= 550) {
        this.tranformScale = 'scale(0.6)'
      } else if (x <= 1110 && x >= 960) {
        this.tranformScale = 'scale(0.5)'
      } else {
        this.tranformScale = 'scale(1)'
      }
    }
  },
  created () {
    if (sessionStorage.getItem('token_seesion') !== null) {
      this.$store.dispatch('LogOut')
    }
  },
  mounted () {
    this.onResize()
  },
  computed: {}
}
</script>

<style>
.backdrop-dialog {
  width: 100%;
  height: 100%;
  background: #000;
  position: absolute;
  opacity: 0.1;
}
</style>
