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
    <v-dialog v-model="dialog_expire" max-width="350">
      <v-card class="confirm-dialog">
        <v-card-title v-text="errorDialog" :style="{ 'font-weight': '500' }">
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="signOut()" class="save">
            {{ $t('btn_ok') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_error" max-width="350">
      <v-card class="confirm-dialog">
        <v-card-title v-text="errorDialog2" :style="{ 'font-weight': '500' }">
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closePop()" class="save">
            {{ $t('btn_close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Headers from '@/components/Header'
import Footers from '@/components/Footer'
export default {
  name: 'defaults-page',
  data () {
    return {
      valueLoading: 0,
      errorDialog: this.$t('popup.text14'),
      errorDialog2: this.$t('popup.text15')
    }
  },
  components: {
    Headers,
    Footers
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    },
    dialog_expire () {
      return this.$store.getters.dialog_expire
    },
    dialog_error () {
      this.errorDialog2 = this.$t('popup.text15') + ' (Error Code 500)'
      return this.$store.getters.dialog_error
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
    },
    signOut () {
      this.$store.commit('SetDialogExpire', false)
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    },
    closePop () {
      this.$store.commit('SetDialogError', false)
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
      // this.$store.commit(
      //   'SetAccessToken',
      //   sessionStorage.getItem('token_seesion')
      // )
    }
  }
}
</script>
