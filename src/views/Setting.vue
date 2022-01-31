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
      <main-system-user
        v-if="currentView.code == '2'"
        :menu="rightMenu"
        @add="addApp"
      />
      <add-system-user
        v-else-if="currentView.code == '2-1'"
        :menu="rightMenu"
        @cancel="cancelApp"
        @save="saveApp"
      />
    </div>
  </div>
</template>

<script>
import MainSystemUser from './SystemUser/Main'
import AddSystemUser from './SystemUser/Add'
export default {
  name: 'setting',
  data () {
    return {
      menu: [
        {
          code: '1',
          text: 'ผู้ใช้งานระบบ'
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
        code: '2',
        text: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ'
      },
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
      sortStatus: false,
      addAppMode: false,
      currentView: {
        code: '2',
        text: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ'
      },
      rightMenu: [
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
  },
  computed: {},
  watch: {},
  methods: {
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
        code: '2-1',
        text: 'เพิ่มแอปพลิเคชัน'
      }
      console.log('addApp', value)
    },
    selectedMenu (item, index) {
      this.selectedItem = item
      this.currentView = item
      this.rightMenu = item !== undefined ? item.child : []
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
  components: {
    MainSystemUser,
    AddSystemUser
  },
  mounted () {}
}
</script>
