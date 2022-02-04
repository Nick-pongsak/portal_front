<template>
  <div style="height:calc(100% - 0px);">
    <v-card>
      <div :class="'tab'">
        <div
          :class="'tab-row'"
          v-for="(item, index) in menu"
          :key="item.code"
          @click="tabs(item, index)"
        >
          {{ $t('set.app_tab' + index) }}
          <div v-show="active.code == item.code" class="line-active"></div>
        </div>
      </div>
      <!-- v-show="active.code == '1'" -->
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
      <div v-if="active.code == '2.1'" class="table">
        <div class="head-table">
          <div class="head" style="width:9.5%" @click="sort(headCol[0], 0)">
            <div class="column-name">{{ $t('set.list_col1') }}</div>
            <v-icon
              v-text="sortNo == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:25%;padding-left:8px"
            @click="sort(headCol[1], 1)"
          >
            <div class="column-name">{{ $t('set.list_col2') }}</div>
            <v-icon
              v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:22%" @click="sort(headCol[2], 2)">
            <div class="column-name">
              {{ $t('set.list_col3') }}
            </div>
            <v-icon
              v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:20%" @click="sort(headCol[3], 3)">
            <div class="column-name">
              {{ $t('set.list_col4') }}
            </div>
            <v-icon
              v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:13%" @click="sort(headCol[4], 4)">
            <div class="column-name">
              {{ $t('set.list_col5') }}
            </div>
            <v-icon
              v-text="sortNo == 4 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:10.5%">
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
            <div
              class="body"
              style="width:10%;padding-top:5px;padding-left:7px"
            >
              {{ item.index + 1 }}
            </div>
            <div
              class="body"
              style="width:25%;padding-left:5px;padding-top:5px"
            >
              {{ item.name_th }}
            </div>
            <div class="body" style="width:22%;padding-top:5px">
              {{ item.category_name_th }}
            </div>
            <div class="body" style="width:20%;display:flex">
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
            <div class="body" style="width:10%;display:flex;padding-left:12px">
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
      <div v-else class="table">
        <div class="head-table">
          <div class="head" style="width:9.5%" @click="sort2('no')">
            <div class="column-name">{{ $t('set.list_col1') }}</div>
            <v-icon
              v-text="sortNo2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:40%;padding-left:8px"
            @click="sort('name_th')"
          >
            <div class="column-name">{{ $t('set.manege_col2') }}</div>
            <v-icon
              v-text="sortAppName2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:20%"
            @click="sort2('category_name_th')"
          >
            <div class="column-name">
              {{ $t('set.manege_col3') }}
            </div>
            <v-icon
              v-text="sortCount2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:20%" @click="sort2('type_login')">
            <div class="column-name">
              {{ $t('set.manege_col4') }}
            </div>
            <v-icon
              v-text="sortAccess2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:10%">
            <div class="column-name">
              {{ $t('set.list_col6') }}
            </div>
          </div>
        </div>
        <div class="body-table">
          <div v-if="list.list2 == 0" class="no-data">
            -- ไม่พบรายการ --
          </div>
          <div
            class="body-row"
            v-for="(item, index) in list2"
            :key="'app_name_' + index"
          >
            <div
              class="body"
              style="width:10%;padding-top:5px;padding-left:7px"
            >
              {{ index + 1 }}
            </div>
            <div
              class="body"
              style="width:40%;padding-left:5px;padding-top:5px"
            >
              {{ item.app_name + ' index' }}
            </div>
            <div class="body" style="width:20%;padding-top:5px">
              {{ item.count }}
            </div>
            <div class="body" style="width:20%;display:flex">
              {{ item.access }}
            </div>
            <div class="body" style="width:10%;display:flex;padding-left:12px">
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
  name: 'main-list-app',
  props: {
    menu: {
      type: Array,
      required: true
    },
    active: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      list2: [
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        },
        {
          app_name: 'app',
          count: 8,
          access: 11
        }
      ],
      searchApp: '',
      sortNo: null,
      headCol: ['index', 'name_th', 'category_name_th', 'type_login', 'status'],
      sortNo2: false,
      sortAppName2: false,
      sortCount2: false,
      sortAccess2: false,
      mainSort: {
        feild: 'name_th',
        orderby: true
      }
    }
  },
  computed: {},
  watch: {
    searchApp: {
      handler: function (todos) {
        // if (this.active.code == '2.1') {
        if (todos.trim().length > 2 || todos.trim().length == 0) {
          this.fetchData()
        }
        // } else {
        // console.log('searchApp===> 2')
        // }
      }
    }
  },
  methods: {
    add () {
      this.$emit('add', this.active)
    },
    edit (item) {
      let obj = {
        current: this.active,
        item: item
      }
      this.$emit('edit', obj)
    },
    tabs (item, index) {
      this.$emit('tabs', item)
    },
    sort2 (feild) {
      this.sortNo = this.sortNo == index ? null : index
      if (feild !== 'no') {
        if (this.mainSort.feild == feild) {
          this.mainSort.orderby = !this.mainSort.orderby
        } else {
          this.mainSort.orderby = false
        }
        this.mainSort.feild = feild
        this.fetchData()
      }
    },
    sort (feild, index) {
      this.sortNo = this.sortNo == index ? null : index
      if (feild == 'index') {
      } else {
        if (this.mainSort.feild == feild) {
          this.mainSort.orderby = !this.mainSort.orderby
        } else {
          this.mainSort.orderby = false
        }
        this.mainSort.feild = feild
        this.fetchData()
      }
    },
    fetchData () {
      if (this.active.code == '2.1') {
        let req = {
          keyword: this.searchApp.trim(),
          field: this.mainSort.feild,
          sort: this.mainSort.orderby ? 'asc' : 'desc'
        }
        this.$store.dispatch('getAppList', req).then(res => {
          this.list = res.data
        })
      } else {
        // let req = {
        //   keyword: this.searchApp.trim(),
        //   field: this.mainSort.feild,
        //   sort: this.mainSort.orderby ? 'asc' : 'desc'
        // }
        // this.$store.dispatch('getGroupist', req).then(res => {
        //   this.list2 = res.data
        // })
      }
    }
  },
  mounted () {},
  created () {
    this.fetchData()
  }
}
</script>
