<template>
  <div id="maintenance" style="display: block;">
    <div class="pics">
      <!-- <img src="@/assets/images/maintenance.png" /> -->
    </div>
    <div v-html="txt"></div>
  </div>
</template>

<script>
export default {
  name: 'under-maintenance',
  data () {
    return {
      txt: ''
    }
  },
  computed: {
    statusServ () {
      return this.$store.getters.statusServ
    }
  },
  watch: {},
  created () {
    if (
      this.$store.getters.access_token === '' &&
      localStorage.getItem('token') === null
    ) {
    } else {
      this.$store.dispatch('watchServ', 'login')
    }
  },
  mounted () {
    if (
      this.$store.getters.access_token === '' &&
      localStorage.getItem('token') === null
    ) {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
.pics {
  text-align: center;
}
.lines {
  padding-bottom: 18px;
}
.body-text {
  padding-top: 80px;
  font-size: 25px;
  text-align: center;
}
</style>
