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
          <div class="head" style="width:9.5%" @click="sort('no')">
            <div class="column-name">{{ $t('set.list_col1') }}</div>
            <v-icon
              v-text="sortNo ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:30%;padding-left:8px"
            @click="sort('app_name')"
          >
            <div class="column-name">{{ $t('set.list_col2') }}</div>
            <v-icon
              v-text="sortAppName ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:13%" @click="sort('type')">
            <div class="column-name">
              {{ $t('set.list_col3') }}
            </div>
            <v-icon
              v-text="sortType ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:22%" @click="sort('access')">
            <div class="column-name">
              {{ $t('set.list_col4') }}
            </div>
            <v-icon
              v-text="sortAccess ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:15%" @click="sort('status')">
            <div class="column-name">
              {{ $t('set.list_col5') }}
            </div>
            <v-icon
              v-text="sortStatus ? 'mdi-menu-up' : 'mdi-menu-down'"
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
          <div
            class="body-row"
            v-for="(item, index) in list"
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
              style="width:30%;padding-left:5px;padding-top:5px"
            >
              {{ item.app_name + ' index' }}
            </div>
            <div class="body" style="width:13%;padding-top:5px">
              {{ item.type }}
            </div>
            <div class="body" style="width:22%;display:flex">
              {{ item.access }}
            </div>
            <div
              class="body"
              :style="{
                width: '15%',
                display: 'flex',
                color: item.status == true ? '#66BB6A' : '#FBC02D'
              }"
            >
              {{ item.status == true ? 'เปิดใช้งาน' : 'ปิดการใช้งาน' }}
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
            @click="sort('app_name')"
          >
            <div class="column-name">{{ $t('set.manege_col2') }}</div>
            <v-icon
              v-text="sortAppName2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:20%" @click="sort2('count')">
            <div class="column-name">
              {{ $t('set.manege_col3') }}
            </div>
            <v-icon
              v-text="sortCount2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:20%" @click="sort2('access')">
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
      list: [
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'LDAP (AD)',
          status: false
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        }
      ],
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
      sortNo: false,
      sortAppName: false,
      sortType: false,
      sortAccess: false,
      sortType: false,
      sortStatus: false,
      sortNo2: false,
      sortAppName2: false,
      sortCount2: false,
      sortAccess2: false
    }
  },
  computed: {},
  watch: {
    searchApp: {
      handler: function (todos) {
        if (this.active.code == '1') {
          // console.log('searchApp===> 1')
        } else {
          // console.log('searchApp===> 2')
        }
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
      if (feild == 'no') {
        this.sortNo2 = !this.sortNo
      } else if (feild == 'app_name') {
        this.sortAppName2 = !this.sortAppName2
      } else if (feild == 'count') {
        this.sortCount2 = !this.sortCount2
      } else if (feild == 'access') {
        this.sortAccess2 = !this.sortAccess2
      }
    },
    sort (feild) {
      if (feild == 'no') {
        this.sortNo = !this.sortNo
      } else if (feild == 'app_name') {
        this.sortAppName = !this.sortAppName
      } else if (feild == 'type') {
        this.sortType = !this.sortType
      } else if (feild == 'access') {
        this.sortAccess = !this.sortAccess
      } else if (feild == 'status') {
        this.sortStatus = !this.sortStatus
      }
    }
  },
  mounted () {}
}
</script>
