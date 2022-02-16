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
          {{ item[$i18n.locale] }}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="header">{{ currentView[$i18n.locale] }}</div>
      <main-admin-app
        v-if="currentView.code == '1'"
        @add="addUser"
        @edit="editUser"
      />
      <user-list
        v-else-if="currentView.code == '1.1'"
        :data="editRow"
        :master="masterUser"
        @cancel="cancelUser"
        @save="saveUser"
        @clear="clearUser"
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
import UserList from './AdminApp/UserList'
import MainAdminApp from './AdminApp/Main'
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
          th: 'ผู้ใช้งานระบบ',
          en: 'User',
          child: []
        },
        {
          code: '2',
          th: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ',
          en: 'Application Management',
          child: [
            {
              code: '2.1',
              th: 'รายการแอปพลิเคชัน',
              en: 'Application List'
            },
            {
              code: '2.2',
              th: 'จัดกลุ่มผู้ใช้งานแอปพลิเคชัน',
              en: 'Application Group'
            }
          ]
        }
      ],
      selectedItem: {},
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
          th: 'รายการแอปพลิเคชัน',
          en: 'Application List'
        },
        {
          code: '2.2',
          th: 'จัดกลุ่มผู้ใช้งานแอปพลิเคชัน',
          en: 'Application Group'
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
      editRow2: {},
      masterUser: {
        admin_menu: 0,
        app_id: 0,
        cx: '',
        email: '',
        emp_code: '',
        group_id: '',
        mode: 'add',
        name_en: '',
        name_th: '',
        nickname1_en: '',
        nickname1_th: '',
        nickname2_en: '',
        nickname2_th: '',
        origin_password: '',
        password: '',
        phone: '',
        postname_en: '',
        postname_th: '',
        status: 1,
        status_permission: '',
        type_login: 1,
        user_id: 0,
        username: ''
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    addUser (value) {
      this.currentView = {
        code: '1.1',
        text: 'เพิ่มผู้ใช้งานระบบ'
      }
      this.editRow = JSON.parse(JSON.stringify(this.masterUser))
    },
    editUser (value) {
      this.currentView = {
        code: '1.1',
        text: 'แก้ไขผู้ใช้งานระบบ'
      }
      this.editRow = value
      this.editRow.mode = 'edit'
      this.editRow.origin_password = value.password
      this.editRow.password = '99999999'
    },
    clearUser (value) {
      this.currentView = {
        code: '1',
        text: 'ผู้ใช้งานระบบ'
      }
    },
    cancelUser (value) {
      this.currentView = {
        code: '1',
        text: 'ผู้ใช้งานระบบ'
      }
    },
    saveUser (value) {
      this.currentView = {
        code: '1',
        text: 'ผู้ใช้งานระบบ'
      }
    },
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
      // console.log(value)
      // console.log(this.$i18n.locale)
      this.currentView = {
        code: value.code,
        th:
          value.code == '2.1'
            ? 'เพิ่มแอปพลิเคชัน'
            : 'เพิ่มกลุ่มผู้ใช้งานแอปพลิเคชัน',
        en:
          value.code == '2.1'
            ? 'เพิ่มแอปพลิเคชัน'
            : 'เพิ่มกลุ่มผู้ใช้งานแอปพลิเคชัน'
      }
      this.activeTab = value
      if (value.code == '2.1') {
        this.editRow = JSON.parse(JSON.stringify(this.defaultEditRow))
      } else {
        this.editRow2 = JSON.parse(JSON.stringify(this.defaultEditRow2))
        this.editRow2.app = []
        this.editRow2.name_th = ''
        this.editRow2.name_en = ''
      }
    },
    editApp (value) {
      this.currentView = {
        code: value.current.code,
        th:
          value.current.code == '2.1'
            ? 'แก้ไขแอปพลิเคชัน'
            : 'แก้ไขกลุ่มผู้ใช้งานแอปพลิเคชัน',
        en:
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
      // if (item.code == '2') {
      this.selectedItem = item
      this.currentView = item
      this.activeTab = item.child.length > 0 ? item.child[0] : {}
      this.rightMenu = item !== undefined ? item.child : []
      // }
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
      this.selectedItem = this.menu[0]
      this.currentView = this.menu[0]
      this.activeTab = null
      // this.activeTab = this.rightMenu[0]
    }
  },
  created () {
    this.int()
  },
  components: {
    MainListApp,
    AddApp,
    AddGroup,
    UserList,
    MainAdminApp
  },
  mounted () {}
}
</script>
