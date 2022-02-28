<template>
  <v-app :style="{ 'font-family': $i18n.locale == 'th' ? 'Kanit' : 'Roboto' }">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({})
}
</script>

<style src="@/assets/style/index.scss" lang="scss"></style>
