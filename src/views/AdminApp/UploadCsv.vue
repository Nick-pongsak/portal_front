<template>
  <div style="height:calc(100% - 0px);">
    <v-card style="padding-top:5px">
      <div :class="'tab'" style="padding-bottom:10px">
        <div
          :class="'tab-row'"
          v-for="(item, index) in menu"
          :key="'upload-tab-row-' + item.code"
          @click="tabs(item, index)"
          :id="'upload-tab-row-' + item.code"
        >
          {{ $t(item.text) + ' (' + data[item.feild].length + ')' }}
          <div v-show="active == item.code" class="line-active"></div>
        </div>
      </div>
      <div style="padding-left:15px;display:flex;width:100%">
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
        ></div>
      </div>
      <div style="height: 100%">
        <div class="example-wrapper">
          <ag-grid-vue
            style="width: 100%; height:calc(100% - 90px);"
            class="ag-theme-alpine"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
          ></ag-grid-vue>
          <!-- :tooltipShowDelay="tooltipShowDelay" -->
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue'
export default {
  name: 'upload-csv',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      searchApp: '',
      menu: [
        {
          code: 1,
          text: 'upload.text2',
          feild: 'new'
        },
        {
          code: 2,
          text: 'upload.text3',
          feild: 'update'
        },
        {
          code: 3,
          text: 'upload.text4',
          feild: 'mistake'
        }
      ],
      active: 1,
      tooltipShowDelay: null,
      columnDefs: [
        {
          headerName: 'ลำดับ',
          // headerName: this.$t('set.list_col1'),
          field: 'index',
          width: 70,
          pinned: 'left',
          valueFormatter: formatterCol1
        },
        {
          field: 'type_login',
          headerName: 'ประเภทการเข้าใช้งานระบบ',
          // headerTooltip: 'ประเภทการเข้าใช้งานระบบ',
          width: 130,
          pinned: 'left',
          valueFormatter: formatterCol2
        },
        {
          field: 'emp_code',
          headerName: 'รหัสพนักงาน',
          width: 100,
          pinned: 'left'
        },
        {
          field: 'name_th',
          headerName: 'ชื่อ-สกุล (TH)',
          width: 150,
          pinned: 'left'
        },
        { field: 'name_en', headerName: 'ชื่อ-สกุล (EN)', width: 150 },
        { field: 'postname_th', headerName: 'ตำแหน่ง (TH)', width: 150 },
        { field: 'postname_en', headerName: 'ตำแหน่ง (EN)', width: 150 },
        { field: 'email', headerName: 'อีเมล', width: 160 },
        { field: 'cx', headerName: '3CX', width: 110 },
        {
          field: 'group_name_th',
          headerName: 'กลุ่มผู้ใช้งานแอปพลิเคชัน',
          width: 160
        },
        { field: 'username', headerName: 'ชื่อผู้ใช้งาน', width: 150 },
        { field: 'password', headerName: 'รหัสผ่าน', width: 180 },
        {
          field: 'status',
          headerName: 'สถานะ',
          width: 180,
          valueFormatter: formatterCol13,
          cellRendererSelector: params => {
            // const moodDetails = { component: 'moodCellRenderer' }
            // const genderDetails = {
            //   component: 'genderCellRenderer',
            //   params: {
            //     values: ['Male', 'Female']
            //   }
            // }
            // if (params.status === 1)
            //   return '<span style="color:red">' + params.status + '</span>'
            // else if (params.data.type === 'mood') return moodDetails
            // else return undefined
          }
        }
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        lockPosition: true
      },
      rowData: this.data.new
    }
  },
  computed: {},
  watch: {
    searchApp: {
      handler: function (todos) {
        if (todos.trim().length > 1 || todos.trim().length == 0) {
          // this.onFilterTextBoxChanged(todos)
        }
      }
    }
  },
  methods: {
    tabs (item, index) {
      // if (this.active.code !== item.code) {
      //   this.$emit('tabs', item)
      //   this.sortNo = null
      //   this.mainSort = {
      //     feild: 'name_th',
      //     orderby: true
      //   }
      //   this.fetchData(item)
      // } else {
      //   this.$emit('tabs', item)
      // }
    }
  },
  components: {
    'ag-grid-vue': AgGridVue
  },
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
  }
}
window.formatterCol1 = function formatterCol2 (params) {
  return params.value + 1
}
window.formatterCol2 = function formatterCol2 (params) {
  return params.value == 0 ? 'ผู้ใช้งานบนแอปพลิเคชัน ' : 'LDAP'
}
window.formatterCol13 = function formatterCol2 (params) {
  return params.value == 0 ? 'ปิดการใช้งาน' : 'เปิดใช้งาน'
}
</script>
