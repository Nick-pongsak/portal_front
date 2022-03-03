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
            <div class="column-name">{{ $t('profile.account_3')}}</div>
            <v-icon
              v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:17%" @click="sort(headCol[2], 2)">
            <div class="column-name">
              {{ $t('user.text1') }}
            </div>
            <v-icon
              v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:18%" @click="sort(headCol[3], 3)">
            <div class="column-name">
              {{ $t('user.text2') }}
            </div>
            <v-icon
              v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:17%" @click="sort(headCol[4], 4)">
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
        <div class="body-table">
          <div v-if="list.length == 0" class="no-data">
            {{$t('popup.text9')}}
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
              {{ item.status ? $t('user.text7') :  $t('user.text8') }}
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
    </v-card>
  </div>
</template>

<script>
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
      }
    }
  },
  computed: {},
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
    add () {
      // this.fetchData()
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
        if (feild == 'group_name_th') {
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
      let search = this.searchApp.trim()
      let type = null
      if (search.length > 0) {
        if (str1.indexOf(search.toUpperCase()) >= 0) {
          type = 1
        } else if (str2.indexOf(search.toUpperCase()) >= 0) {
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
  }
}
</script>
