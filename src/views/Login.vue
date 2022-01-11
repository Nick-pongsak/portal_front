<template>
  <div id="login">
    <div id="login-box">
      <div class="part-top">
        <div class="logo"></div>
        <h1 class="company-name">{{ firstname }}</h1>
      </div>
      <div class="part-bottom">
        <form>
          <input type="text" v-model="user.username" placeholder="User Name" />
          <div class="input-with-icon">
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
          <button type="submit" @click.prevent="login">LOG IN</button>
          <div class="login-error" :class="{ active: error }">
            Username or password is incorrect
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      showpass: false,
      user: {
        username: "",
        password: "",
      },
      firstname: "",
      error: false,
    };
  },
  methods: {
    login() {
      this.$router.push("/dashboard");
      console.log("==========>");
    },
  },
  created() {},
  mounted() {
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
  computed: {},
};
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
