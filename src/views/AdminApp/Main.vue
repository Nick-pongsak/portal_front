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
          <div class="head" style="width:5%" @click="sort(headCol[0], 0)">
            <div class="column-name">{{ $t('set.list_col1') }}</div>
            <v-icon
              v-text="sortNo == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:13%;padding-left:8px"
            @click="sort(headCol[1], 1)"
          >
            <div class="column-name">{{ 'รหัสพนักงาน' }}</div>
            <v-icon
              v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:15%" @click="sort(headCol[2], 2)">
            <div class="column-name">
              {{ 'ชื่อ-นามสกุล' }}
            </div>
            <v-icon
              v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:17%" @click="sort(headCol[3], 3)">
            <div class="column-name">
              {{ 'ตำแหน่ง' }}
            </div>
            <v-icon
              v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:17%" @click="sort(headCol[4], 4)">
            <div class="column-name">
              {{ 'กลุ่มผู้ใช้งานแอปฯ' }}
            </div>
            <v-icon
              v-text="sortNo == 4 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:15%" @click="sort(headCol[5], 5)">
            <div class="column-name">
              {{ 'การเข้าใช้งาน' }}
            </div>
            <v-icon
              v-text="sortNo == 5 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:13%" @click="sort(headCol[6], 6)">
            <div class="column-name">
              {{ 'สถานะ' }}
            </div>
            <v-icon
              v-text="sortNo == 6 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:5%">
            <div class="column-name">
              {{ $t('set.list_col6') }}
            </div>
          </div>
        </div>
        <div class="body-table">
          <div v-if="list.length == 0" class="no-data">
            -- ไม่พบรายการ --
          </div>
          <div
            class="body-row"
            v-for="(item, index) in list"
            :key="'app_name_' + index"
          >
            <div class="body" style="width:5%;padding-top:5px;padding-left:7px">
              {{ item.index + 1 }}
            </div>
            <div
              class="body"
              style="width:13%;padding-left:5px;padding-top:5px"
            >
              {{ item.emp_code }}
            </div>
            <div class="body" style="width:15%;padding-top:5px">
              {{ item.name_th }}
            </div>
            <div class="body" style="width:17%;padding-top:5px">
              {{ item.postname_th }}
            </div>
            <div class="body" style="width:17%;padding-top:5px">
              {{ item.group_name_th }}
            </div>
            <div class="body" style="width:15%;display:flex">
              {{ item.type_login ? 'LDAP (AD)' : 'ผู้ใช้งานบนแอปพลิเคชัน' }}
            </div>
            <div
              class="body"
              :style="{
                width: '13%',
                display: 'flex',
                color: item.status ? '#66BB6A' : '#FBC02D'
              }"
            >
              {{ item.status ? 'เปิดใช้งาน' : 'ปิดการใช้งาน' }}
            </div>
            <div class="body" style="width:5%;display:flex;padding-left:12px">
              <v-icon
                @click="edit(item)"
                v-text="'mdi-pencil'"
                style="color:#CE1212"
                size="20"
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
        'type_login'
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
        if (todos.trim().length > 2 || todos.trim().length == 0) {
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
      let req = {
        keyword: this.searchApp.trim(),
        field: this.mainSort.feild,
        sort: this.mainSort.orderby ? 'asc' : 'desc'
      }
      this.$store.dispatch('getUserList', req).then(res => {
        this.list = res.data
      })
    }
  },
  mounted () {},
  created () {
    this.items = []
    this.fetchData()
  }
}
</script>
