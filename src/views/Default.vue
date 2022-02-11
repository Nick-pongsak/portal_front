<template>
  <div>
    <div class="loading-bar" v-if="loading">
      <v-progress-circular
        :size="50"
        color="red"
        :value="valueLoading"
        indeterminate
      ></v-progress-circular>
    </div>
    <headers />
    <div class="body-main">
      <router-view />
    </div>
    <footers />
  </div>
</template>

<script>
import Headers from '@/components/Header'
import Footers from '@/components/Footer'
export default {
  name: 'defaults-page',
  data: () => ({ valueLoading: 0 }),
  components: {
    Headers,
    Footers
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    }
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    goTo (plink) {
      this.$router.push({ path: plink })
    },
    home () {
      this.$router.push({ path: '/' })
    }
  },
  mounted () {
    if (
      this.$store.getters.access_token === '' &&
      sessionStorage.getItem('token_seesion') === null
    ) {
      this.$store.dispatch('LogOut').then(() => {
        // this.$router.push('/')
      })
    } else if (sessionStorage.getItem('token_seesion') !== null) {
      console.log("=====>")
      // this.$store.commit(
      //   'SetAccessToken',
      //   sessionStorage.getItem('token_seesion')
      // )
    }
  }
}
</script>
