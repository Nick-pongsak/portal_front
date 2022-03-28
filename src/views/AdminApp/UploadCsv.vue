<template>
  <div style="height:calc(100% - 30px);" id="uploadCsvPage">
    <v-card>
      <div :class="'tab'" style="padding-bottom:8px;padding-top:10px">
        <div
          :class="'tab-row'"
          v-for="item in menu"
          :key="'upload-tab-row-' + item.code"
          @click="tabs(item)"
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
        <v-btn
          @click="saveBtn()"
          :class="'cancel-btn'"
          style="height: 22px"
          :disabled="
            data['new'].length > 0 || data['update'].length > 0 ? false : true
          "
        >
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
      icons: null,
      columnDefs: [
        {
          headerName: this.$t('upload.text5'),
          field: 'index',
          width: 60,
          minWidth: 60,
          pinned: 'left',
          sortingOrder: ['asc', 'desc'],
          valueFormatter: params => {
            return params.value + 1
          },
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 120,
          pinned: 'left',
          field: 'type_login',
          sortingOrder: ['asc', 'desc'],
          headerName: this.$t('upload.text6'),
          headerTooltip: this.$t('upload.text6'),
          valueFormatter: params => {
            return params.value !== ''
              ? params.value == 0
                ? this.$t('master.type_login_0')
                : 'LDAP'
              : '-'
          },
          tooltipComponent: 'type_login',
          tooltipValueGetter: params => {
            return params.value !== ''
              ? params.value == 0
                ? this.$t('master.type_login_0')
                : 'LDAP'
              : '-'
          },
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 110,
          pinned: 'left',
          field: 'emp_code',
          sort: 'asc',
          sortingOrder: ['asc', 'desc'],
          valueFormatter: formatterNull,
          tooltipComponent: 'emp_code',
          headerTooltip: this.$t('upload.text7'),
          headerName: this.$t('upload.text7'),
          tooltipValueGetter: formatterNull,
          // icons: myIcons,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 150,
          pinned: 'left',
          field: 'name_th',
          sortingOrder: ['asc', 'desc'],
          tooltipComponent: 'name_th',
          valueFormatter: formatterNull,
          headerName: this.$t('upload.text8'),
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 150,
          field: 'name_en',
          sortingOrder: ['asc', 'desc'],
          tooltipComponent: 'name_en',
          valueFormatter: formatterNull,
          headerName: this.$t('upload.text9'),
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 150,
          field: 'postname_th',
          sortingOrder: ['asc', 'desc'],
          valueFormatter: formatterNull,
          tooltipComponent: 'postname_th',
          tooltipValueGetter: formatterNull,
          headerName: this.$t('upload.text10'),
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 150,
          field: 'postname_en',
          sortingOrder: ['asc', 'desc'],
          valueFormatter: formatterNull,
          tooltipComponent: 'postname_en',
          tooltipValueGetter: formatterNull,
          headerName: this.$t('upload.text11'),
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 160,
          field: 'email',
          sortingOrder: ['asc', 'desc'],
          tooltipComponent: 'email',
          valueFormatter: formatterNull,
          headerName: this.$t('upload.text12'),
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          field: 'cx',
          width: 110,
          sortingOrder: ['asc', 'desc'],
          tooltipComponent: 'cx',
          valueFormatter: formatterNull,
          headerName: this.$t('upload.text13'),
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 160,
          sortingOrder: ['asc', 'desc'],
          field: 'group_name_th',
          valueFormatter: formatterNull,
          tooltipComponent: 'group_name_th',
          headerName: this.$t('upload.text14'),
          tooltipValueGetter: formatterNull,
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 150,
          field: 'username',
          sortingOrder: ['asc', 'desc'],
          valueFormatter: formatterNull,
          tooltipComponent: 'username',
          tooltipValueGetter: formatterNull,
          headerName: this.$t('upload.text15'),
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 180,
          field: 'password',
          sortingOrder: ['asc', 'desc'],
          valueFormatter: formatterNull,
          tooltipComponent: 'password',
          tooltipValueGetter: formatterNull,
          headerName: this.$t('upload.text16'),
          cellStyle: {
            // 'font-family': this.$i18n.locale == 'th' ? 'Kanit' : 'Roboto'
          }
        },
        {
          width: 100,
          field: 'status',
          sortingOrder: ['asc', 'desc'],
          headerName: this.$t('upload.text17'),
          valueFormatter: params => {
            return params.value !== ''
              ? params.value == 0
                ? this.$t('user.text8')
                : this.$t('user.text7')
              : '-'
          },
          tooltipComponent: 'status',
          tooltipValueGetter: params => {
            return params.value !== ''
              ? params.value == 0
                ? this.$t('user.text8')
                : this.$t('user.text7')
              : '-'
          },
          cellStyle: params =>
            params.value !== ''
              ? params.value == 1
                ? { color: '#66BB6A' }
                : { color: '#FBC02D' }
              : { color: '#797979' }
        }
      ],
      defaultColDef: {
        resizable: true,
        minWidth: 80,
        maxWidth: 300,
        sortable: true,
        lockPosition: true
      },
      rowData: this.data['new'],
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
          this.setNoData()
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
      this.setNoData()
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
      return 30
    },
    setNoData () {
      let temp = document.getElementsByClassName('ag-overlay-no-rows-center')[0]
      if (temp !== undefined) {
        temp.innerHTML = this.$t('upload.text19')
      }
    },
    tabs (item) {
      if (this.active.code !== item.code) {
        this.active = item.code
        this.rowData = this.data[item.feild]
        if (item.feild == 'mistake') {
          let fieldFind = this.columnDefs.filter(a => a.field == 'note')
          if (fieldFind.length == 0) {
            this.columnDefs.push({
              width: 180,
              field: 'note',
              sortingOrder: ['asc', 'desc'],
              cellStyle: { color: '#CE1212' },
              headerName: this.$t('upload.text18'),
              valueFormatter: params => {
                return typeof params.value === 'number' && params.value > 0
                  ? this.$t('upload.text2' + params.value)
                  : '-'
              },
              tooltipComponent: 'note',
              tooltipValueGetter: params => {
                return typeof params.value === 'number' && params.value > 0
                  ? this.$t('upload.text2' + params.value)
                  : '-'
              }
            })
          }
        } else {
          this.columnDefs = this.columnDefs.filter(a => a.field !== 'note')
        }
        this.$emit('tabs', item)
        setTimeout(() => {
          this.setNoData()
        }, 5)
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
      if (this.data['new'].length > 0 || this.data['update'].length > 0) {
        this.btnClick = 'save'
        this.error = false
        this.dialog = true
        this.errorDialog = this.$t('popup.text11')
        this.rightBtn = this.$t('btn_save')
      }
    },
    save () {
      console.log(this.btnClick)
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
        this.$emit('cancel', null)
        this.cancel()
      } else if (this.btnClick == 'cancel') {
        this.$emit('cancel', null)
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

window.formatterNull = function formatterCol2 (params) {
  return params.value == '' ? '-' : params.value
}
window.formatterType = function formatterCol2 (params) {
  return params.value == '' ? '-' : params.value
}
</script>
