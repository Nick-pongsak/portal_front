<template>
  <div style="height:calc(100% - 30px);" id="uploadCsvPage">
    <v-card>
      <div :class="'tab'" style="padding-bottom:8px;padding-top:10px">
        <div
          :class="'tab-row'"
          v-for="(item, index) in menu"
          :key="'upload-tab-row-' + item.code"
          @click="tabs(item, index)"
          :id="'upload-tab-row-' + item.code"
        >
          {{ $t(item.text)
          }}<span style="color:#F0AC11">{{
            ' (' + data[item.feild].length + ')'
          }}</span>
          <div v-show="active == item.code" class="line-active"></div>
        </div>
      </div>
      <div
        @click="setHeadetCol"
        id="hideBtnLang"
        style="display: none;"
        ref="hideBtnLang"
      >
        hideBtnLang
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
            style="width: 100%; height:calc(100% - 83px);"
            class="ag-theme-alpine"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            @grid-ready="onGridReady"
            :tooltipShowDelay="0"
            :getRowHeight="getRowHeight"
            :icons="icons"
          ></ag-grid-vue>
        </div>
      </div>
      <div style="display:none">{{ isLanguage }}</div>
    </v-card>
    <div style="display:flex;padding-top:10px">
      <div style="width:100%;display:flex" class="justify-end">
        <v-btn
          @click="cancelBtn()"
          class="ok-btn"
          style="margin-right:6px;height: 22px;"
        >
          {{ $t('btn_cancel') }}
        </v-btn>
        <v-btn @click="saveBtn()" :class="'cancel-btn'" style="height: 22px">
          {{ $t('btn_save') }}
        </v-btn>
      </div>
    </div>

    <v-dialog v-model="dialog" max-width="350">
      <v-card class="confirm-dialog">
        <v-card-title
          v-text="errorDialog"
          :style="{ 'font-weight': error ? '400' : '500' }"
        >
        </v-card-title>
        <div
          v-if="rightBtn == $t('btn_save')"
          style="font-size:11px"
          class="sub_title"
        >
          {{ $t('popup.text12') }}
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cancel" text @click="cancel()" v-show="!error">
            {{ $t('btn_cancel') }}
          </v-btn>
          <v-btn text @click="save()" class="save">
            {{ error ? $t('btn_close') : rightBtn }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          headerName: this.$t('upload.text5'),
          field: 'index',
          width: 60,
          minWidth: 60,
          pinned: 'left',
          valueFormatter: formatterCol1,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          },
          // icons: {
          //   sortAscending: '<i class="fa fa-sort-alpha-up"/>',
          //   sortDescending: '<i class="fa fa-sort-alpha-down"/>'
          // }
        },
        {
          field: 'type_login',
          headerName: this.$t('upload.text6'),
          width: 120,
          pinned: 'left',
          headerTooltip: this.$t('upload.text6'),
          valueFormatter: formatterCol2,
          tooltipComponent: 'type_login',
          tooltipValueGetter: formatterCol2,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'emp_code',
          headerName: this.$t('upload.text7'),
          width: 110,
          pinned: 'left',
          headerTooltip: this.$t('upload.text7'),
          valueFormatter: formatterNull,
          tooltipComponent: 'emp_code',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'name_th',
          headerName: this.$t('upload.text8'),
          width: 150,
          pinned: 'left',
          valueFormatter: formatterNull,
          tooltipComponent: 'name_th',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'name_en',
          headerName: this.$t('upload.text9'),
          width: 150,
          valueFormatter: formatterNull,
          tooltipComponent: 'name_en',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'postname_th',
          headerName: this.$t('upload.text10'),
          width: 150,
          valueFormatter: formatterNull,
          tooltipComponent: 'postname_th',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'postname_en',
          headerName: this.$t('upload.text11'),
          width: 150,
          valueFormatter: formatterNull,
          tooltipComponent: 'postname_en',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'email',
          headerName: this.$t('upload.text12'),
          width: 160,
          valueFormatter: formatterNull,
          tooltipComponent: 'email',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'cx',
          headerName: this.$t('upload.text13'),
          width: 110,
          valueFormatter: formatterNull,
          tooltipComponent: 'cx',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'group_name_th',
          headerName: this.$t('upload.text14'),
          width: 160,
          valueFormatter: formatterNull,
          tooltipComponent: 'group_name_th',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'username',
          headerName: this.$t('upload.text15'),
          width: 150,
          valueFormatter: formatterNull,
          tooltipComponent: 'username',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'password',
          headerName: this.$t('upload.text16'),
          width: 180,
          valueFormatter: formatterNull,
          tooltipComponent: 'password',
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'status',
          headerName: this.$t('upload.text17'),
          width: 100,
          valueFormatter: formatterCol13,
          tooltipComponent: 'status',
          tooltipValueGetter: formatterCol13,
          cellStyle: params =>
            params.value == 1
              ? {
                  color: '#66BB6A'
                  // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
                }
              : {
                  color: '#FBC02D'
                  // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
                }
        }
      ],
      defaultColDef: {
        resizable: true,
        minWidth: 80,
        sortable: true,
        lockPosition: true
      },
      rowData: [],
      gridApi: null,
      dialog: false,
      errorDialog: this.$t('popup.text1'),
      error: false,
      rightBtn: this.$t('btn_save')
    }
  },
  computed: {
    isLanguage () {
      if (this.gridApi !== null) {
        if (this.columnDefs[0].headerName !== this.$t('upload.text5')) {
          this.$refs.hideBtnLang.click()
        }
      }
      return this.$store.getters.isLanguage
    }
  },
  watch: {
    searchApp: {
      handler: function (todos) {
        if (todos.trim().length > 1 || todos.trim().length == 0) {
          this.fetchData()
        }
      }
    }
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      let data = this.data['new']
      let font = this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
      data.forEach(function (dataItem) {
        dataItem.rowHeight = 32
        // dataItem.cellStyle = 'font-family:' + font
        // console.log(dataItem)
      })
      this.rowData = data
    },
    setHeadetCol () {
      var columnDefs = this.gridApi.getColumnDefs()
      let _this = this
      columnDefs.forEach(function (colDef, index) {
        let txt = index + 5
        colDef.headerName = _this.$t('upload.text' + txt)
      })
      this.columnDefs = columnDefs
    },
    getRowHeight (params) {
      return params.data.rowHeight
    },
    tabs (item) {
      if (this.active.code !== item.code) {
        this.active = item.code
        this.rowData = this.data[item.feild]
        if (item.feild == 'mistake') {
          let fieldFind = this.columnDefs.filter(a => a.field == 'note')
          if (fieldFind.length == 0) {
            this.columnDefs.push({
              field: 'note',
              headerName: this.$t('upload.text18'),
              width: 180,
              cellStyle: { color: '#CE1212' }
            })
          }
        } else {
          this.columnDefs = this.columnDefs.filter(a => a.field !== 'note')
        }
        this.$emit('tabs', item)
      }
    },
    fetchData () {
      let req = {
        keyword: this.searchApp.trim(),
        sort: 'acs',
        field: ''
      }
      this.$store.dispatch('fetchCsv', req).then(res => {
        let data = {
          new: res.data.new,
          update: res.data.update,
          mistake: res.data.mistake,
          total: 0
        }
        data.total =
          res.data.count_new + res.data.count_update + res.data.count_mistake

        let fieldFind = this.menu.filter(a => a.code == this.active)
        if (fieldFind.length > 0) {
          this.rowData = data[fieldFind[0].feild]
        }

        this.$emit('upload', data)
      })
    },
    saveBtn () {
      this.btnClick = 'save'
      this.error = false
      this.dialog = true
      this.errorDialog = this.$t('popup.text11')
      this.rightBtn = this.$t('btn_save')
    },
    save () {
      if (this.btnClick == 'save') {
        this.$store
          .dispatch('saveCsv', null)
          .then(res => {
            if (res.emp_update.length == 0) {
              this.btnClick = 'success'
              this.dialog = true
              this.error = true
              this.errorDialog = this.$t('upload.text20')
              this.rightBtn = this.$t('btn_close')
            } else {
              this.btnClick = 'error'
              this.dialog = true
              this.error = true
              this.errorDialog = this.$t('popup.text13')
              this.rightBtn = this.$t('btn_close')
            }
          })
          .catch(error => {
            // this.btnClick = 'error'
            // this.dialog = true
            // this.error = true
            // this.errorDialog =
            //   this.$t('popup.text2') +
            //   ' (Error Code ' +
            //   error.response.status +
            //   ')'
            // this.list = []
          })
      } else if (this.btnClick == 'success') {
        this.cancel()
      } else if (this.btnClick == 'cancel') {
        this.cancel()
      } else if (this.btnClick == 'error') {
        this.dialog = false
        this.error = false
      }
    },
    cancelBtn () {
      this.error = false
      this.btnClick = 'cancel'
      this.dialog = true
      this.errorDialog = this.$t('popup.text6')
      this.rightBtn = this.$t('btn_ok')
    },
    cancel () {
      this.$emit('cancel', null)
      this.error = false
      this.dialog = false
      this.rightBtn = this.$t('btn_save')
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

// let type_login_0 = this.$t('master.type_login_0')
// let activeTxt = this.$t('user.text7')
// let inActiveTxt = this.$t('user.text8')
// console.log(Vue)

window.formatterNull = function formatterCol2 (params) {
  return params.value == '' ? '-' : params.value
}
window.formatterCol1 = function formatterCol2 (params) {
  return params.value + 1
}
window.formatterCol2 = function formatterCol2 (params) {
  if (typeof params.value === 'number') {
    return params.value == 0 ? 'ผู้ใช้งานบนแอปพลิเคชัน ' : 'LDAP'
  } else {
    return '-'
  }
}
window.formatterCol13 = function formatterCol2 (params) {
  if (typeof params.value === 'number') {
    return params.value == 0 ? 'ปิดการใช้งาน' : 'เปิดใช้งาน'
  } else {
    return '-'
  }
}
</script>
