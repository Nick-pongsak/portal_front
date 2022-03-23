<template>
  <div style="height:calc(100% - 0px);">
    <v-card style="padding-top:30px">
      <div :class="'tab'">
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
        ></div>
      </div>
      <div style="height: 100%">
        <div class="example-wrapper">
          <ag-grid-vue
            style="width: 100%; height:calc(100% - 100px);"
            class="ag-theme-alpine"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
          ></ag-grid-vue>
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
      columnDefs: [
        {
          headerName: 'ลำดับ',
          // headerName: this.$t('set.list_col1'),
          colId: 'rowNum',
          valueGetter: 'node.id',
          width: 70,
          pinned: 'left'
        },
        {
          field: 'type_login',
          headerName: 'ประเภทการเข้าใช้งานระบบ',
          width: 200,
          pinned: 'left'
        },
        {
          field: 'emp_code',
          headerName: 'รหัสพนักงาน',
          width: 115,
          pinned: 'left'
        },
        {
          field: 'name_th',
          headerName: 'ชื่อ-สกุล (TH)',
          width: 200,
          pinned: 'left'
        },
        { field: 'name_en', headerName: 'ชื่อ-สกุล (EN)', width: 230 },
        { field: 'postname_th', headerName: 'ตำแหน่ง (TH)', width: 230 },
        { field: 'postname_en', headerName: 'ตำแหน่ง (EN)', width: 230 },
        { field: 'email', headerName: 'อีเมล', width: 230 },
        { field: 'cx', headerName: '3CX', width: 150 },
        {
          field: 'group_name_th',
          headerName: 'กลุ่มผู้ใช้งานแอปพลิเคชัน',
          width: 230
        },
        { field: 'username', headerName: 'ชื่อผู้ใช้งาน', width: 180 },
        { field: 'password', headerName: 'รหัสผ่าน', width: 180 },
        { field: 'status', headerName: 'สถานะ', width: 180 }
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
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
</script>
