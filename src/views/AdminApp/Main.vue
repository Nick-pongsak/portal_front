<template>
  <div style="height:calc(100% - 0px);">
    <v-card style="padding-top:30px">
      <div style="padding-left:30px;display:flex;width:100%">
        <div style="width:80%">
          <div class="input-with-icon" style="display: flex;width: 300px">
            <v-icon
              v-text="'mdi-magnify'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
            <input
              type="text"
              v-model="searchApp"
              :placeholder="$t('input_search')"
              maxlength="250"
            />
          </div>
        </div>
        <div
          class="justify-end"
          style="width:20%;display:flex;padding-right:30px"
        >
          <v-btn
            @click="upload()"
            class="ok-btn"
            style="margin-right:25px;width:126px"
          >
            {{ $t('upload.btn') }}
          </v-btn>

          <v-btn @click="add()" class="cancel-btn">
            <v-icon
              v-text="'mdi-plus'"
              style="color:#ffffff;margin-right:5px;"
              size="22"
            ></v-icon>
            {{ $t('btn_add') }}
          </v-btn>
        </div>
      </div>
      <div class="table">
        <div class="head-table">
          <div class="head" style="width:6%" @click="sort(headCol[0], 0)">
            <div class="column-name">{{ $t('set.list_col1') }}</div>
            <v-icon
              v-text="sortNo == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:12%;padding-left:8px"
            @click="sort(headCol[1], 1)"
          >
            <div class="column-name">{{ $t('profile.account_3') }}</div>
            <v-icon
              v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:17%"
            @click="sort('name_' + $i18n.locale, 2)"
          >
            <div class="column-name">
              {{ $t('user.text1') }}
            </div>
            <v-icon
              v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:18%"
            @click="sort('postname_' + $i18n.locale, 3)"
          >
            <div class="column-name">
              {{ $t('user.text2') }}
            </div>
            <v-icon
              v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:17%"
            @click="sort('group_name_' + $i18n.locale, 4)"
          >
            <div class="column-name">
              {{ $t('user.text3') }}
            </div>
            <v-icon
              v-text="sortNo == 4 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:15%" @click="sort(headCol[5], 5)">
            <div class="column-name">
              {{ $t('user.text4') }}
            </div>
            <v-icon
              v-text="sortNo == 5 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:9%" @click="sort(headCol[6], 6)">
            <div class="column-name">
              {{ $t('user.text5') }}
            </div>
            <v-icon
              v-text="sortNo == 6 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:6%">
            <div class="column-name">
              {{ $t('set.list_col6') }}
            </div>
          </div>
        </div>
        <div class="body-table" style="height: calc(100% - 90px);">
          <div v-if="list.length == 0" class="no-data">
            {{ $t('popup.text9') }}
          </div>
          <div
            class="body-row"
            v-for="(item, index) in list"
            :key="'app_name_' + index"
          >
            <div class="body" style="width:6%;padding-top:5px;padding-left:7px">
              {{ item.index + 1 }}
            </div>
            <div
              class="body"
              style="width:12%;padding-left:5px;padding-top:5px"
            >
              {{ item.emp_code }}
            </div>
            <div class="body" style="width:17%;padding-top:5px">
              {{ item['name_' + $i18n.locale] }}
            </div>
            <div class="body" style="width:18%;padding-top:5px">
              {{ item['postname_' + $i18n.locale] }}
            </div>
            <div class="body" style="width:17%;padding-top:5px">
              {{ item['group_name_' + $i18n.locale] }}
            </div>
            <div class="body" style="width:15%;display:flex;padding-top: 5px;">
              {{
                item.type_login == 0
                  ? $t('master.type_login_0')
                  : $t('master.type_login_1')
              }}
            </div>
            <div
              class="body"
              :style="{
                'padding-top': '5px',
                width: '9%',
                display: 'flex',
                color: item.status ? '#66BB6A' : '#FBC02D'
              }"
            >
              {{ item.status ? $t('user.text7') : $t('user.text8') }}
            </div>
            <div class="body" style="width:6%;display:flex;padding-left:12px">
              <v-icon
                @click="edit(item)"
                v-text="'mdi-pencil'"
                style="color:#CE1212"
                size="19"
              ></v-icon>
            </div>
          </div>
        </div>
      </div>
      <div
        class="upload-block-csv"
        v-if="!dialog_profile"
        id="image-uploader-csv"
      >
        <image-uploader
          v-model="file"
          :preview="true"
          :maxHeight="768"
          :className="['fileinput', { 'fileinput--loaded': hasImage }]"
          capture="environment"
          :debug="1"
          accept=".csv"
          :autoRotate="true"
          outputFormat="blob"
          @input="setImage"
        >
          <label
            for="fileInput"
            slot="upload-label"
            ref="uploaderCsv"
            style="visibility: hidden;"
          >
            {{ hasImage ? 'Replace' : 'Click to upload' }}
          </label>
        </image-uploader>
      </div>
    </v-card>
    <v-dialog v-model="dialog" max-width="350">
      <v-card class="confirm-dialog">
        <v-card-title
          v-text="errorDialog"
          :style="{ 'font-weight': error ? '400' : '500' }"
        >
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cancel" text @click="cancel()" v-show="!error">
            {{ $t('btn_cancel') }}
          </v-btn>
          <v-btn text @click="save()" class="save">
            {{ $t('btn_ok') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize'
export default {
  name: 'main-admin-app',
  props: {},
  data () {
    return {
      list: [],
      searchApp: '',
      sortNo: null,
      headCol: [
        'index',
        'emp_code',
        'name_th',
        'postname_th',
        'group_name_th',
        'type_login',
        'status'
      ],
      mainSort: {
        feild: 'emp_code',
        orderby: true
      },
      hasImage: false,
      file: '',
      dialog: false,
      errorDialog: '',
      error: false
    }
  },
  computed: {
    dialog_profile () {
      return this.$store.getters.dialog_profile
    }
  },
  watch: {
    searchApp: {
      handler: function (todos) {
        if (todos.trim().length > 1 || todos.trim().length == 0) {
          this.fetchData()
        }
      }
    }
  },
  methods: {
    upload_test () {
      let data = {
        new: [],
        update: this.list,
        mistake: [],
        total: 0
      }
      data.total = data.new.length + data.update.length + data.mistake.length
      this.$emit('upload', data)
    },
    upload () {
      this.$refs.uploaderCsv.click()
    },
    setImage: function (output) {
      if (output.size > 5242880) {
        this.file = ''
        this.hasImage = false
      } else {
        this.file = output
        this.hasImage = true
        let formData = new FormData()
        formData.append('csv', output)
        this.$store
          .dispatch('uploadCsv', formData)
          .then(res => {
            let req = {
              keyword: '',
              sort: 'acs',
              field: ''
            }
            this.$store.dispatch('fetchCsv', req).then(res => {
              let id = document.getElementById('image-uploader-csv')
              if (id !== null) {
                let inputCur = id.getElementsByTagName('input')
                inputCur[0].value = ''
              }

              let data = {
                new: res.data.new,
                update: res.data.update,
                mistake: res.data.mistake,
                total: 0
              }
              data.total =
                res.data.count_new +
                res.data.count_update +
                res.data.count_mistake
              this.$emit('upload', data)
            })
          })
          .catch(error => {
            if (error && error.response && error.response.status === 500) {
              this.btnClick = 'errorfile'
              this.dialog = true
              this.error = true
              this.errorDialog = this.$t('upload.text25')
            } else if (
              error &&
              error.response &&
              error.response.status === 401
            ) {
              this.btnClick = 'error'
              this.dialog = true
              this.error = true
              this.errorDialog =
                this.$t('popup.text2') +
                ' (Error Code ' +
                error.response.status +
                ')'
            }
          })
      }
    },
    save () {
      let id = document.getElementById('image-uploader-csv')
      if (id !== null) {
        let inputCur = id.getElementsByTagName('input')
        inputCur[0].value = ''
      }
      this.dialog = false
      this.error = false
    },
    add () {
      this.$emit('add', this.active)
    },
    edit (item) {
      this.$emit('edit', item)
    },
    sort (feild, index) {
      this.sortNo = this.sortNo == index ? null : index
      if (feild == 'index') {
        if (this.mainSort.orderby) {
          this.list = this.list.sort(function (a, b) {
            return b.index - a.index
          })
        } else {
          this.list = this.list.sort(function (a, b) {
            return a.index - b.index
          })
        }
        this.mainSort.orderby = !this.mainSort.orderby
      } else {
        if (this.mainSort.feild == feild) {
          this.mainSort.orderby = !this.mainSort.orderby
        } else {
          this.mainSort.orderby = false
        }
        this.mainSort.feild = feild
        if (feild == 'group_name_' + this.$i18n.locale) {
          if (this.mainSort.orderby) {
            this.list = this.list.sort((a, b) =>
              String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
                ? 1
                : -1
            )
          } else {
            this.list = this.list.sort((a, b) =>
              String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
                ? -1
                : 1
            )
          }
        } else {
          this.fetchData()
        }
      }
    },
    fetchData (item) {
      let str1 = 'LDAP(AD)'
      let str2 = 'ผู้ใช้งานบนแอปพลิเคชัน'
      let str3 = 'DHAS PORTAL USER'
      let search = this.searchApp.trim()
      let type = null
      if (search.length > 0) {
        if (str1.indexOf(search.toUpperCase()) >= 0) {
          type = 1
        } else if (
          str2.indexOf(search.toUpperCase()) >= 0 ||
          str3.indexOf(search.toUpperCase()) >= 0
        ) {
          type = 0
        }
      }

      let req = {
        keyword: type == null ? this.searchApp.trim() : '',
        field: this.mainSort.feild,
        sort: this.mainSort.orderby ? 'asc' : 'desc'
      }
      this.$store.dispatch('getUserList', req).then(res => {
        let temp = []
        if (type !== null) {
          let results = res.data.filter(a => a.type_login == type)
          for (let i = 0; i < results.length; i++) {
            results[i].index = i
            temp.push(results[i])
          }
          this.list = temp
        } else {
          this.list = res.data
        }
        // this.list = res.data
      })
    }
  },
  mounted () {},
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
    }
    this.items = []
    this.fetchData()
  },
  components: {
    ImageUploader
  }
}
</script>
