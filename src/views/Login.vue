<template>
  <div id="login">
    <div id="login-box">
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
              placeholder="User Name"
            />
            <img
              src="@/assets/icons/account.svg"
              alt="account"
              class="account"
            />
          </div>
          <div class="input-with-icon" :class="{ active: error }">
            <input
              type="password"
              v-show="!showpass"
              v-model="user.password"
              placeholder="Password"
            />
            <input
              type="text"
              v-show="showpass"
              v-model="user.password"
              placeholder="Password"
            />
            <img
              src="@/assets/icons/eye.svg"
              v-show="!showpass"
              alt="show/hide password"
              class="eye"
              @click="showpass = !showpass"
            />
            <img
              src="@/assets/icons/eye-hided.svg"
              v-show="showpass"
              alt="show/hide password"
              class="eye eye-hided"
              @click="showpass = !showpass"
            />
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
      error: true,
      radio: false,
      objA: { name: 'a' },
      objB: { name: 'b' },
      radioGroup: '',
      dataRole: [
        { code: '1', title: 'LDAP(AD)' },
        { code: '2', title: 'Username Portal' }
      ],
      systemName: 'PORTAL',
      err_text: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'
    }
  },
  methods: {
    login () {
      this.$router.push('/dashboard')
    }
  },
  created () {},
  mounted () {
    /*
    this.$store.dispatch("checkServ").then((res) => {
      if (res.data.status == "offline" || res.data.status == "going_down") {
        this.$router.push("/maintenance");
      } else if (res.data.status == "processing") {
        if (this.$store.getters.administrator === false) {
          this.$router.push("/maintenance");
        }
      } else if (res.data.status == "online") {
        this.$store.dispatch("LogOut");
      }
    });
    */
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
