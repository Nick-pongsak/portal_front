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
          {{ $t(item.text) }}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="header" v-if="currentView.code == '1.2'">
        {{ $t(currentView.text)
        }}<span style="color:#F0AC11">{{ ' (' + editRow.total + ')' }}</span>
      </div>
      <div class="header" v-else>{{ $t(currentView.text) }}</div>
      <main-admin-app
        v-if="currentView.code == '1'"
        @add="addUser"
        @edit="editUser"
        @upload="uploadCSV"
      />
      <user-list
        v-else-if="currentView.code == '1.1'"
        :data="editRow"
        :master="masterUser"
        @cancel="cancelUser"
        @save="saveUser"
        @clear="clearUser"
      />
      <upload-csv
        v-else-if="currentView.code == '1.2'"
        :data="editRow"
        @cancel="cancelCsv"
        @upload="uploadCsv"
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
      <main-term
        v-if="currentView.code == '3'"
        @add="addTerm"
        @edit="editTerm"
        @view="viewTerm"
      />
      <term-list
        v-else-if="currentView.code == '3.1'"
        :data="editRow"
        :master="masterUser"
        @cancel="cancelTerm"
        @save="saveTerm"
        @clear="clearTerm"
      />
    </div>
  </div>
</template>

<script>
import UploadCsv from './AdminApp/UploadCsv'
import UserList from './AdminApp/UserList'
import MainAdminApp from './AdminApp/Main'
import MainListApp from './ManageApp/Main'
import AddApp from './ManageApp/AddApp'
import AddGroup from './ManageApp/AddGroup'
import TermList from './Term/TermList'
import MainTerm from './Term/Main'
export default {
  name: 'setting',
  data () {
    return {
      menu: [],
      selectedItem: {},
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
          text: 'manageapp.text1'
        },
        {
          code: '2.2',
          text: 'set.app_tab1'
        }
      ],
      activeTab: {},
      defaultEditRow: {
        status: 1,
        status_sso: 0,
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
  computed: {
    info () {
      return this.$store.getters.user
    }
  },
  watch: {},
  methods: {
    clearTerm (value) {
      this.currentView = this.menu[2]
    },
    cancelTerm (value) {
      this.currentView = this.menu[2]
    },
    saveTerm (value) {
      this.currentView = this.menu[2]
    },
    addTerm (value) {
      this.currentView = {
        code: '3.1',
        text: 'term.text1'
      }
      this.editRow = value
    },
    editTerm (value) {
      this.currentView = {
        code: '3.1',
        text: 'term.text1'
      }
      this.editRow = value
    },
    viewTerm (value) {
      this.currentView = {
        code: '3.1',
        text: 'term.text1'
      }
      this.editRow = value
    },
    uploadCSV (value) {
      this.currentView = {
        code: '1.2',
        text: 'upload.text1'
      }
      this.editRow = value
    },
    uploadCsv (data) {
      this.editRow = data
    },
    cancelCsv () {
      this.currentView = this.menu[0]
    },
    addUser (value) {
      this.currentView = {
        code: '1.1',
        text: 'user.text9'
      }
      this.editRow = JSON.parse(JSON.stringify(this.masterUser))
    },
    editUser (value) {
      this.currentView = {
        code: '1.1',
        text: 'user.text17'
      }
      this.editRow = value
      this.editRow.mode = 'edit'
      this.editRow.origin_password = value.password
      this.editRow.password = '99999999'
    },
    clearUser (value) {
      this.currentView = this.menu[0]
    },
    cancelUser (value) {
      this.currentView = this.menu[0]
    },
    saveUser (value) {
      this.currentView = this.menu[0]
    },
    clearApp (value) {
      this.currentView = {
        code: '2',
        text: 'manageapp.text8'
      }
    },
    cancelApp (value) {
      this.currentView = {
        code: '2',
        text: 'manageapp.text8'
      }
    },
    saveApp (value) {
      this.currentView = {
        code: '2',
        text: 'manageapp.text8'
      }
    },
    addApp (value) {
      this.currentView = {
        code: value.code,
        text: value.code == '2.1' ? 'app.text2' : 'group.text10'
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
        text: value.current.code == '2.1' ? 'app.text19' : 'group.text9'
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
      if (this.activeTab !== null && item.code == '2') {
        if (item.code == '2' && this.activeTab.code == '2.2') {
          if (document.getElementById('tab2.1') !== null) {
            document.getElementById('tab2.1').click()
          }
        }
      }
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
      let masterMenu = [
        {
          code: '1',
          text: 'user.text11',
          child: []
        },
        {
          code: '2',
          text: 'manageapp.text8',
          child: [
            {
              code: '2.1',
              text: 'manageapp.text1'
            },
            {
              code: '2.2',
              text: 'set.app_tab1'
            }
          ]
        },
        {
          code: '3',
          text: 'term.text1',
          child: []
        }
      ]
      if (this.info.admin_menu == 0) {
        this.menu = [masterMenu[0]]
      } else {
        this.menu = masterMenu
      }
      if (this.menu.length > 0) {
        this.selectedItem = this.menu[0]
        this.currentView = this.menu[0]
        this.activeTab = null
      }
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
    MainAdminApp,
    UploadCsv,
    TermList,
    MainTerm
  },
  mounted () {}
}
</script>
