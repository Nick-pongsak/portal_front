<template>
  <div id="dashboard">
    <modal />
    <div id="dashboard-right">TEST WEB PORTAL</div>
    <div class="modal" v-show="isOnLine">
      <div class="content">
        <div class="text" style="color: #ff0404">{{ networkWarning }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./../components/Modal";
export default {
  name: "dashboard",
  components: {
    Modal,
  },
  data() {
    return {
      isOnLine: false,
      networkWarning: "",
    };
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    },
  },
  watch: {},
  methods: {},
  mounted() {
    /*
    if (
      this.$store.getters.access_token === "" &&
      localStorage.getItem("token") === null
    ) {
      this.$store.dispatch("LogOut").then(() => {
        this.$router.push("/");
      });
    } else {
      window.addEventListener("online", () => {
        this.isOnLine = false;
      });
      window.addEventListener("offline", () => {
        this.isOnLine = true;
      });
    }
    */
  },
};
</script>
