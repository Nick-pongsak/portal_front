<template>
  <div id="setting-page">
    <div class="left">
      <div class="header">{{ $t('set.menu') }}</div>
      <div class="list">
        <div
          :class="
            selectedItem.code == item.code ? 'list-row active' : 'list-row'
          "
          v-for="(item, index) in menu"
          :key="item.code"
          @click="selectedMenu(item, index)"
        >
          {{ $t('set.left_menu' + index) }}
        </div>
      </div>
    </div>
    <div class="right">
      <!-- <div class="header">{{ $t('set.right_menu') }}</div> -->
      <div class="header">{{ currentView.text }}</div>
      <main-list-app
        v-if="currentView.code == '2'"
        :menu="rightMenu"
        @add="addApp"
        @edit="editApp"
        @tabs="selectedTabs"
        :active="activeTab"
      />
      <add-app
        v-else-if="activeTab.code == '2.1'"
        :menu="rightMenu"
        @cancel="cancelApp"
        @save="saveApp"
        @clear="clearApp"
      />
      <add-group
        v-else-if="activeTab.code == '2.2'"
        :menu="rightMenu"
        @cancel="cancelApp"
        @save="saveApp"
        @clear="clearApp"
      />
    </div>
  </div>
</template>

<script>
import MainListApp from './ManageApp/Main'
import AddApp from './ManageApp/AddApp'
import AddGroup from './ManageApp/AddGroup'
export default {
  name: 'setting',
  data () {
    return {
      menu: [
        {
          code: '1',
          text: 'ผู้ใช้งานระบบ',
          child: []
        },
        {
          code: '2',
          text: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ',
          child: [
            {
              code: '1',
              text: 'รายการแอปพลิเคชัน'
            },
            {
              code: '2',
              text: 'จัดกลุ่มผู้ใช้งานแอปพลิเคชัน'
            }
          ]
        }
      ],
      selectedItem: {
        // code: '2',
        // text: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ'
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
      searchApp: '',
      sortNo: false,
      sortAppName: false,
      sortType: false,
      sortAccess: false,
      sortStatus: false,
      addAppMode: false,
      currentView: {},
      rightMenu: [
        {
          code: '2.1',
          text: 'รายการแอปพลิเคชัน'
        },
        {
          code: '2.2',
          text: 'จัดกลุ่มผู้ใช้งานแอปพลิเคชัน'
        }
      ],
      activeTab: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    clearApp (value) {
      this.currentView = {
        code: '2',
        text: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ'
      }
    },
    cancelApp (value) {
      this.currentView = {
        code: '2',
        text: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ'
      }
    },
    saveApp (value) {
      this.currentView = {
        code: '2',
        text: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ'
      }
    },
    addApp (value) {
      value.code = this.currentView.code + '.' + value.code
      this.currentView = {
        code: value.code,
        text:
          value.code == '2.1'
            ? 'เพิ่มแอปพลิเคชัน'
            : 'เพิ่มกลุ่มผู้ใช้งานแอปพลิเคชัน'
      }
      this.activeTab = value
    },
    editApp (value) {
      this.currentView = {
        code: value.current.code,
        text:
          value.current.code == '2.1'
            ? 'เพิ่มแอปพลิเคชัน'
            : 'เพิ่มกลุ่มผู้ใช้งานแอปพลิเคชัน'
      }
      this.activeTab = value.current
    },
    selectedMenu (item, index) {
      this.selectedItem = item
      this.currentView = item
      this.activeTab = item.child.length > 0 ? item.child[0] : {}
      this.rightMenu = item !== undefined ? item.child : []
    },
    selectedTabs (item) {
      this.activeTab = item
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
    },
    int () {
      this.selectedItem = this.menu[1]
      this.currentView = this.menu[1]
      this.activeTab = this.rightMenu[0]
    }
  },
  created () {
    this.int()
  },
  components: {
    MainListApp,
    AddApp,
    AddGroup
  },
  mounted () {}
}
</script>
