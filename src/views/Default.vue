<template>
  <div>
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
  data: () => ({}),
  components: {
    Headers,
    Footers
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
  }
}
</script>
