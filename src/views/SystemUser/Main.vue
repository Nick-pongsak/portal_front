<template>
  <div>
    <v-card>
      <div :class="'tab'">
        <div
          :class="'tab-row'"
          v-for="(item, index) in menu"
          :key="item.code"
          @click="selectedTabs(item, index)"
        >
          {{ item.text }}
          <div v-show="selectedTab.code == item.code" class="line-active"></div>
        </div>
      </div>
      <div style="padding-left:30px;display:flex;width:100%">
        <div style="width:80%">
          <div class="input-with-icon" style="display: flex;width: 300px;">
            <v-icon
              v-text="'mdi-magnify'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
            <input type="text" v-model="searchApp" :placeholder="'ค้นหา'" />
          </div>
        </div>
        <div
          style="width:20%;justify-content: end;align-items: flex-end;display:flex;padding-right:30px"
        >
          <v-btn @click="add()" class="cancel-btn">
            <v-icon
              v-text="'mdi-plus'"
              style="color:#ffffff;margin-right:5px;"
              size="22"
            ></v-icon>
            {{ 'เพิ่ม' }}
          </v-btn>
        </div>
      </div>
      <div class="table">
        <div class="head-table">
          <div class="head" style="width:10%" @click="sort('no')">
            <div class="column-name">ลำดับ</div>
            <v-icon
              v-text="sortNo ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
          </div>
          <div class="head" style="width:30%" @click="sort('app_name')">
            <div class="column-name">แอปพิเคชั่น</div>
            <v-icon
              v-text="sortAppName ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:13%" @click="sort('type')">
            <div class="column-name">
              หมวดหมู่
            </div>
            <v-icon
              v-text="sortType ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:22%" @click="sort('access')">
            <div class="column-name">
              การเข้าการใช้งาน
            </div>
            <v-icon
              v-text="sortAccess ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:15%" @click="sort('status')">
            <div class="column-name">
              สถานะ
            </div>
            <v-icon
              v-text="sortStatus ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:10%">
            <div class="column-name">
              เครื่องมือ
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
              style="width:10%;padding-top:5px;padding-left:15px"
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
            <div class="body" style="width:10%;display:flex">
              <v-icon
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
  name: 'main-system-user',
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedTab: {
        code: '1',
        text: 'รายการแอปพลิเคชัน'
      },
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
          access: 'LDAP (AD',
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
      searchApp: '',
      sortNo: false,
      sortAppName: false,
      sortType: false,
      sortAccess: false,
      sortStatus: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    add () {
      this.$emit('add', null)
    },
    selectedTabs (item, index) {
      this.selectedTab = item
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
