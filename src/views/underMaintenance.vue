<template>
  <div id="maintenance" style="display: block;">
    <div class="pics">
      <img src="@/assets/images/maintenance.png" />
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
  watch: {
    statusServ (newValue) {
      let status = newValue.filter(a => a.key == 'status')
      if (status.length > 0) {
        if (status[0].messages == 'online') {
          this.$router.push('/')
        } else if (
          status[0].messages == 'offline' ||
          status[0].messages == 'processing'
        ) {
          let messages = newValue.filter(a => a.key == 'messages')
          if (messages.length > 0) {
            let temp = ''
            messages[0].messages.forEach(function (item) {
              temp = temp + '<div class="lines">' + item + '</div>'
            })
            this.txt = `<div class="body-text">` + temp + `</div>`
          }
        }
      }
    }
  },
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
        this.$store.dispatch('checkServ').then(res => {
          if (
            res.data.status == 'processing' ||
            res.data.status == 'offline' ||
            res.data.status == 'going_down'
          ) {
            let newValue = res.data
            if (
              newValue.status == 'processing' ||
              newValue.status == 'offline' ||
              newValue.status == 'going_down'
            ) {
              if (newValue.messages.length > 0) {
                let messages = newValue.messages
                if (messages.length > 0) {
                  let temp = ''
                  messages.forEach(function (item) {
                    temp = temp + '<div class="lines">' + item + '</div>'
                  })
                  this.txt = `<div class="body-text">` + temp + `</div>`
                }
              }
            }
          } else if (res.data.status == 'online') {
            this.$router.push('/')
          }
        })
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
