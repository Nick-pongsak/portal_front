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
      <user-list
        v-if="currentView.code == '1'"
        :menu="rightMenu"
        @cancel="cancelApp"
        @save="saveApp"
        @clear="clearApp"
      />
      <main-list-app
        v-else-if="currentView.code == '2'"
        :menu="rightMenu"
        @add="addApp"
        @edit="editApp"
        @tabs="selectedTabs"
        :active="activeTab"
      />
      <add-app
        v-else-if="activeTab.code == '2.1'"
        :data="editRow"
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
        :data="editRow2"
      />
    </div>
  </div>
</template>

<script>
import UserList from './UserList'
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
              code: '2.1',
              text: 'รายการแอปพลิเคชัน'
            },
            {
              code: '2.2',
              text: 'จัดกลุ่มผู้ใช้งานแอปพลิเคชัน'
            }
          ]
        }
      ],
      selectedItem: {},
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
      activeTab: {},
      defaultEditRow: {
        status: 1,
        status_sso: 1,
        type_login: 1,
        image: '',
        mode: 'add',
        name_th: '',
        name_en: '',
        description_th: '',
        description_en: '',
        category_id: 0,
        key_app: '',
        url: ''
      },
      defaultEditRow2: {
        mode: 'add',
        name_th: '',
        name_en: '',
        total_user: 0,
        total_app: 0,
        app: []
      },
      editRow: {},
      editRow2: {}
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
      this.currentView = {
        code: value.code,
        text:
          value.code == '2.1'
            ? 'เพิ่มแอปพลิเคชัน'
            : 'เพิ่มกลุ่มผู้ใช้งานแอปพลิเคชัน'
      }
      this.activeTab = value
      if (value.code == '2.1') {
        this.editRow = this.defaultEditRow
      } else {
        this.editRow2 = this.defaultEditRow2
        this.editRow2.app = []
      }
    },
    editApp (value) {
      this.currentView = {
        code: value.current.code,
        text:
          value.current.code == '2.1'
            ? 'แก้ไขแอปพลิเคชัน'
            : 'แก้ไขกลุ่มผู้ใช้งานแอปพลิเคชัน'
      }
      this.activeTab = value.current
      if (value.current.code == '2.1') {
        this.editRow = value.item
        this.editRow.mode = 'edit'
      } else {
        this.editRow2 = value.item
        this.editRow2.app = []
        this.editRow2.mode = 'edit'
      }
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
    AddGroup,
    UserList
  },
  mounted () {}
}
</script>
