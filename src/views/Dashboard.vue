<template>
  <div id="dashboard" v-resize="onResize">
    <div class="name-page">
      {{ group['name_' + $i18n.locale] }}
      <span style="visibility: hidden;">{{ loadHome }}</span>
      <div class="line-page" style="margin-top: 15px;"></div>
    </div>
    <div>
      <div
        class="justify-end"
        :style="{
          display: 'flex',
          'padding-top': showDragAndDrop ? '10px' : '0px',
          'margin-bottom': showDragAndDrop ? '10px' : '0px',
          'padding-right': '5px'
        }"
      >
        <div v-if="showDragAndDrop">
          <v-btn text @click="clearDragAndDrop()" class="drag-btn close">
            {{ $t('btn_close') }}
          </v-btn>
          <v-btn
            text
            @click="saveDragAndDrop()"
            class="drag-btn save"
            style="margin-left:10px"
          >
            {{ $t('btn_save_close') }}
          </v-btn>
        </div>
        <div v-else class="icon-line" @click="openDragAndDrop()">
          <v-icon
            v-text="'mdi-sort-variant'"
            style="color:#000000;opacity:0.5;cursor:pointer"
            size="23"
          ></v-icon>
        </div>
      </div>
      <div
        class="details"
        :style="{
          display: 'flex',
          'padding-top': showDragAndDrop ? '10px' : '0px',
          border: showDragAndDrop ? '1px dashed #707070' : ''
        }"
      >
        <div :style="{ width: '15%' }"></div>
        <div :style="{ width: '70%' }">
          <dnd-zone :transition-duration="0.3" v-show="list.length > 0">
            <dnd-container
              :dnd-model="list"
              dnd-id="grid-example"
              class="row"
              dense
            >
              <dnd-item
                v-for="item in list"
                :key="item.app_id"
                :dnd-id="item.app_id"
                :dnd-model="item"
                :is-draggable="showDragAndDrop"
              >
                <v-col
                  cols="12"
                  sm="12"
                  md="4"
                  lg="4"
                  xl="3"
                  style="display: flex;justify-content: center"
                >
                  <div
                    class="body-round"
                    :style="{
                      cursor: showDragAndDrop ? 'move' : ''
                    }"
                  >
                    <v-card :style="{ transform: tranformScale }">
                      <v-img
                        :style="{ cursor: showDragAndDrop ? '' : 'pointer' }"
                        height="180"
                        :src="item.image"
                        @click="openDialog(item)"
                      >
                        <div class="sys-text">
                          <div
                            class="sys-name"
                            v-text="item['name_' + $i18n.locale]"
                          ></div>
                          <div
                            class="sys-type"
                            v-text="
                              '(' + item['category_name_' + $i18n.locale] + ')'
                            "
                          ></div>
                        </div>
                      </v-img>
                      <v-card-text>
                        {{ item['description_' + $i18n.locale] }}
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn
                          text
                          @click="openLogin(item)"
                          :style="{
                            width: 'auto',
                            background:
                              item.status == 1 ? '#ce1212' : '#FBC02D',
                            cursor: item.status == 1 ? 'pointer' : 'unset'
                          }"
                        >
                          {{
                            item.status == 1
                              ? $t('btn_signin')
                              : $t('btn_maintenance')
                          }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </div>
                </v-col>
              </dnd-item>
            </dnd-container>
          </dnd-zone>
        </div>
        <div :style="{ width: '15%' }"></div>
      </div>
    </div>

    <!---Dialogs-->
    <v-dialog
      v-model="dialog"
      max-width="700"
      :no-click-animation="false"
      :style="{ transform: tranformScale }"
    >
      <v-card id="detail-dashboard-dialogs">
        <div class="justify-end" style="display: flex;">
          <v-icon
            @click="CloseDialogs()"
            v-text="'mdi-close'"
            style="color:#000000;"
            size="20"
          ></v-icon>
        </div>
        <div class="img-detail" :style="{ transform: tranformScale }">
          <v-img
            :style="{ transform: tranformScale }"
            :src="selectedRow.image"
            max-height="240"
            max-width="280"
          >
            <!-- max-height="180" max-width="240" -->
            <!-- max-height="230" max-width="498" -->
          </v-img>
        </div>
        <div class="sys-name">
          {{
            selectedRow['name_' + $i18n.locale] +
              ' (' +
              selectedRow['category_name_' + $i18n.locale] +
              ')'
          }}
        </div>
        <div class="details">
          <textarea
            v-model="selectedRow['description_' + $i18n.locale]"
          ></textarea>
        </div>
        <v-card-actions
          class="justify-center"
          style="padding-bottom:20px;padding-top:20px"
        >
          <v-btn
            text
            @click="openLogin(selectedRow)"
            class="cancel-btn"
            v-show="selectedRow.status == 1"
          >
            {{
              selectedRow.status == 1 ? $t('btn_signin') : $t('btn_maintenance')
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
var CryptoJS = require('crypto-js')
var aesEcb = require('aes-ecb')
export default {
  name: 'dashboard',
  data () {
    return {
      list: [],
      dialog: false,
      selectedRow: {},
      showDragAndDrop: false,
      tranformScale: 'scale(1)',
      group: {}
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    },
    info () {
      return this.$store.getters.user
    },
    loadHome () {
      if (this.$store.getters.loadHome) {
        this.fetchData()
        this.$store.commit('SetLoadHome', false)
      }
      return this.$store.getters.loadHome
    }
  },
  watch: {
    list: {
      handler: function (todos) {
        if (this.showDragAndDrop) {
          // console.log(todos)
        }
      },
      deep: true
    }
  },
  methods: {
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      if (x <= 375) {
        this.tranformScale = 'scale(0.8)'
      } else if (x > 375 && x <= 550) {
        this.tranformScale = 'scale(0.9)'
      } else if (x <= 1110 && x >= 960) {
        this.tranformScale = 'scale(0.8)'
      } else {
        this.tranformScale = 'scale(1)'
      }
    },
    saveDragAndDrop () {
      this.showDragAndDrop = false
      this.onResize()
      if (this.list.length > 0) {
        // let theArray = this.list.filter(word => word.app_id !== 99999)
        let theArray = this.list
        let results = theArray.map(a => a.app_id)
        if (results.length > 0) {
          let req = {
            user_id: this.info.user_id,
            order: results.toString()
          }
          this.$store.dispatch('saveHome', req).then(res => {
            console.log('Success')
          })
        }
      }
    },
    clearDragAndDrop () {
      this.showDragAndDrop = false
      this.onResize()
    },
    openDragAndDrop () {
      this.showDragAndDrop = true
      this.onResize()
    },
    openDialog (row) {
      if (this.showDragAndDrop == false) {
        this.selectedRow = row
        this.dialog = true
      }
    },
    CloseDialogs () {
      this.dialog = false
    },
    openLogin (row) {
      if (row.app_id == 99999) {
        this.$router.push('/setting')
      } else if (this.showDragAndDrop == false) {
        if (row.status) {
          row.verify = 1
          let url = row.url
          let username = row.username
          if (row.type_login == 1 && row.status_sso == 1) {
            username = row.user_ldap
          }
          let iv = CryptoJS.lib.WordArray.random(16)
          let keyapp = username + row.key_app
          let password = CryptoJS.AES.encrypt(username, keyapp, {
            iv: iv
          }).toString()

          if (row.key_app == 'CorporateAndRollingSecretKeysAES') {
            let strKeyEn = keyapp.substring(0, 16)
            password = aesEcb.encrypt(strKeyEn, username)
          } else if (row.key_app == 'mktopskey') {
            password = CryptoJS.AES.encrypt(username, keyapp)
            // var decrypted = CryptoJS.AES.decrypt(password, keyapp).toString(
            //   CryptoJS.enc.Utf8
            // )
          }

          let str =
            '?username=' +
            username +
            '&password=' +
            encodeURIComponent(password)

          // console.log(username)
          // console.log(keyapp)
          // console.log(password.toString())
          // console.log(decrypted)
          if (row.type_login == 0) {
            if (row.status_sso == 1 && row.verify == 1) {
              window.open(url + str, '_blank')
            } else {
              window.open(url, '_blank')
            }
          } else {
            if (row.status_sso == 1) {
              window.open(url + str, '_blank')
            } else {
              window.open(url, '_blank')
            }
          }
        }
      }
    },
    fetchData () {
      let req = {
        group_id: this.info.group_id,
        user_id: this.info.user_id
      }
      this.list = []
      this.group = {}
      let dataTemp = []
      this.$store.dispatch('getHomeData', req).then(res => {
        let app = res.data.app
        this.group = res.data
        let order = res.data.order.split(',')
        for (let i = 0; i < order.length; i++) {
          let index = app.findIndex(h => h.app_id == order[i])
          if (order[i] == '99999' && this.info.status_permission == 1) {
            dataTemp.push({
              image: res.data.path + '1645086704.png',
              name_th: 'DHAS PORTAL SETTING',
              category_name_th: 'ADMIN',
              name_en: 'DHAS PORTAL SETTING',
              category_name_en: 'ADMIN',
              app_id: 99999,
              status: true,
              description_th: 'ตั้งค่าระบบ DHAS PORTAL (Administrator Menu)',
              description_en:
                'DHAS PORTAL application settings (Administrator Menu)'
            })
          } else {
            if (index >= 0) {
              app[index].image = res.data.path + app[index].image
              dataTemp.push(app[index])
            }
          }
        }
        for (let i = 0; i < app.length; i++) {
          let index = dataTemp.findIndex(h => h.app_id == app[i].app_id)
          if (index < 0) {
            app[i].image = res.data.path + app[i].image
            dataTemp.push(app[i])
          }
        }
        if (this.info.status_permission == 1) {
          let index = dataTemp.findIndex(h => h.app_id == 99999)
          if (index < 0) {
            dataTemp.push({
              image: res.data.path + '1645086704.png',
              name_th: 'DHAS PORTAL SETTING',
              category_name_th: 'ADMIN',
              name_en: 'DHAS PORTAL SETTING',
              category_name_en: 'ADMIN',
              app_id: 99999,
              status: true,
              description_th: 'ตั้งค่าระบบ DHAS PORTAL (Administrator Menu)',
              description_en:
                'DHAS PORTAL application settings (Administrator Menu)'
            })
          }
        }
        this.list = dataTemp
      })
    }
  },
  created () {
    if (
      this.$store.getters.access_token === '' &&
      sessionStorage.getItem('token_seesion') === null
    ) {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    } else if (sessionStorage.getItem('token_seesion') !== null) {
      this.$store.commit(
        'SetAccessToken',
        sessionStorage.getItem('token_seesion')
      )
      this.onResize()
      this.fetchData()
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
      this.$store.commit(
        'SetAccessToken',
        sessionStorage.getItem('token_seesion')
      )
    }
    let googleanylytics = sessionStorage.getItem('googleanylytics')
    if (googleanylytics === null) {
      // insert head
      // let sciHead2 = document.getElementsByTagName('script')
      // if (sciHead2.length < 3) {
      var script = document.createElement('script')
      let str = unescape(
        "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PVDSH95')"
      )
      // script.src = unescape("(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({'gtm.start':new Date().getTime(), event: 'gtm.js'});var f = d.getElementsByTagName(s)[0],j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src ='https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);})(window, document, 'script', 'dataLayer', 'GTM-PVDSH95')")
      //  console.log(script)
      script.innerHTML = str
      document.getElementsByTagName('head')[0].appendChild(script)
      // document.getElementsByTagName('head')[0].appendChild(unescape(script))
      // }

      // insert body
      let bodyHtml =
        '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PVDSH95"height="0" width="0" style="display:none;visibility:hidden"></iframe>'
      // let nos = document.getElementsByTagName('noscript')[0]
      var noscript = document.createElement('noscript')
      noscript.innerHTML = bodyHtml
      document.getElementsByTagName('body')[0].appendChild(noscript)
      // if (subNos.length == 1) {
      // nos.append(bodyHtml)
    }
  }
}
</script>
