<template>
  <div style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px;height: calc(100% - 10px);">
      <div class="detail-add" style="overflow:hidden">
        <div class="rows">
          <div style="width:30%" class="rows-name">
            {{ $t('group.text1') }}
          </div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="nameTh"
                :placeholder="$t('input_selected')"
                maxlength="250"
                @keyup="enableBtnSave"
                @keypress="enableBtnSave"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">
            {{ $t('group.text2') }}
          </div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="nameEn"
                :placeholder="$t('input_selected')"
                maxlength="250"
                @keyup="enableBtnSave"
                @keypress="enableBtnSave"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">
            {{ $t('group.text11') }}
          </div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="editRow.group_id"
                :disabled="true"
                :style="{ background: '#D1D1D1' }"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">
            {{ $t('group.text3') }}
          </div>
          <div style="width:70%" class="rows-input">
            <v-btn class="cancel-btn" style="width:200px" @click="openPopup">
              {{ $t('group.text4') }}
            </v-btn>
          </div>
        </div>
        <div class="rows" style="height:100%">
          <div style="width:30%"></div>
          <div style="width:70%">
            <div class="table" style="padding-left:0px">
              <div class="head-table" style="background:#ffffff">
                <div
                  class="head"
                  style="width:10%"
                  @click="sort(headCol[0], 0)"
                >
                  <div class="column-name">{{ $t('manageapp.text0') }}</div>
                  <v-icon
                    v-text="sortNo == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:30%"
                  @click="sort('name_' + $i18n.locale, 1)"
                >
                  <div class="column-name">{{ $t('manageapp.text1') }}</div>
                  <v-icon
                    v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:20%"
                  @click="sort('category_name_' + $i18n.locale, 2)"
                >
                  <div class="column-name">
                    {{ $t('app.text1') }}
                  </div>
                  <v-icon
                    v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:25%"
                  @click="sort(headCol[3], 3)"
                >
                  <div class="column-name">
                    {{ $t('user.text4') }}
                  </div>
                  <v-icon
                    v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:15%"
                  @click="sort(headCol[4], 4)"
                >
                  <div class="column-name">
                    {{ $t('user.text5') }}
                  </div>
                  <v-icon
                    v-text="sortNo == 4 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
              </div>
              <div
                class="body-table"
                :style="{
                  'overflow-y': editRow.app.length == 0 ? 'hidden' : 'auto',
                  height: 'calc(100% - 150px)'
                }"
              >
                <div v-if="editRow.app.length == 0" class="no-data">
                  {{ $t('popup.text9') }}
                </div>
                <div
                  v-else
                  class="body-row"
                  v-for="(item, index) in editRow.app"
                  :key="'setapp' + index"
                >
                  <div class="body" style="width:10%;padding-left:5px">
                    {{ item.index + 1 }}
                  </div>
                  <div class="body" style="width:30%">
                    {{ item['name_' + $i18n.locale] }}
                  </div>
                  <div class="body" style="width:20%">
                    {{ item['category_name_' + $i18n.locale] }}
                  </div>
                  <div class="body" style="width:25%">
                    {{ renderText(item) }}
                  </div>
                  <div
                    class="body"
                    :style="{
                      width: '15%',
                      color: item.status == true ? '#66BB6A' : '#FBC02D'
                    }"
                  >
                    {{
                      item.status == true ? $t('user.text7') : $t('user.text8')
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
    <div style="display:flex;padding-top:15px">
      <div style="width:50%">
        <v-btn
          v-show="editRow.mode == 'edit'"
          @click="clearBtn()"
          class="clear-btn"
          style="margin-right:6px;height: 22px;"
        >
          {{ $t('btn_delete') }}
        </v-btn>
      </div>
      <div style="width:50%;display:flex" class="justify-end">
        <v-btn
          @click="cancelBtn()"
          class="ok-btn"
          style="margin-right:6px;height: 22px;"
        >
          {{ $t('btn_cancel') }}
        </v-btn>
        <!-- @click.stop="dialog = true" -->
        <v-btn
          @click="saveBtn()"
          :class="'cancel-btn'"
          :disabled="enableBtn"
          style="height: 22px"
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

        <!-- <v-card-text>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </v-card-text> -->

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

    <v-dialog v-model="groupDialog" :max-width="900">
      <v-card>
        <div class="justify-end" style="display: flex;">
          <v-icon
            @click="CloseDialogs()"
            v-text="'mdi-close'"
            style="color:#000000;"
            size="20"
          ></v-icon>
        </div>
        <div>
          <div class="head-menu5">
            {{ $t('group.text8') }}
          </div>
          <div class="line-page" style="margin-top:8px"></div>
          <div style="width:100%;margin-top:15px">
            <div style="display:flex;width:100%">
              <div class="input-with-icon search-form">
                <v-icon v-text="'mdi-magnify'" size="20"></v-icon>
                <input
                  style="width:100%"
                  type="text"
                  v-model="searchApp"
                  :placeholder="$t('input_search')"
                />
              </div>
            </div>
            <div class="table">
              <div class="head-table">
                <div
                  class="head"
                  style="width:10%"
                  @click="sort2(headCol[0], 0)"
                >
                  <div class="column-name">{{ $t('manageapp.text0') }}</div>
                  <v-icon
                    v-text="sortNo2 == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:30%"
                  @click="sort2('name_' + $i18n.locale, 1)"
                >
                  <div class="column-name">{{ $t('manageapp.text1') }}</div>
                  <v-icon
                    v-text="sortNo2 == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:20%"
                  @click="sort2('category_name_' + $i18n.locale, 2)"
                >
                  <div class="column-name">
                    {{ $t('app.text1') }}
                  </div>
                  <v-icon
                    v-text="sortNo2 == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:25%"
                  @click="sort2(headCol[3], 3)"
                >
                  <div class="column-name">
                    {{ $t('user.text4') }}
                  </div>
                  <v-icon
                    v-text="sortNo2 == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:15%"
                  @click="sort2(headCol[4], 4)"
                >
                  <div class="column-name">
                    {{ $t('user.text5') }}
                  </div>
                  <v-icon
                    v-text="sortNo2 == 4 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
              </div>
              <div class="body-table">
                <div v-if="list.length == 0" class="no-data">
                  {{ $t('popup.text9') }}
                </div>
                <div
                  class="body-row"
                  v-for="(item, index) in list"
                  :key="'setapp' + index"
                >
                  <div class="body" style="width:10%;padding-left:5px">
                    <v-checkbox
                      color="red"
                      v-model="item.selected"
                      @change="selectedCHK($event, item)"
                      hide-details
                    ></v-checkbox>
                  </div>
                  <div class="body" style="width:30%">
                    {{ item['name_' + $i18n.locale] }}
                  </div>
                  <div class="body" style="width:20%">
                    {{ item['category_name_' + $i18n.locale] }}
                  </div>
                  <div class="body" style="width:25%">
                    {{ renderText(item) }}
                  </div>
                  <div
                    class="body"
                    :style="{
                      width: '15%',
                      color: item.status == true ? '#66BB6A' : '#FBC02D'
                    }"
                  >
                    {{
                      item.status == true ? $t('user.text7') : $t('user.text8')
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div
              style="padding-top:20px;padding-bottom:20px;display:flex"
              class="justify-center"
            >
              <v-btn
                @click="CloseGroup()"
                class="ok-btn"
                style="margin-right:30px;width:200px"
              >
                {{ $t('btn_cancel') }}
              </v-btn>
              <v-btn
                style="width:200px"
                @click="SaveGroup()"
                :class="enableType ? 'cancel-btn-disabled' : 'cancel-btn'"
              >
                {{ $t('btn_save') }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'add-group',
  props: {
    menu: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      errorDialog: this.$t('popup.text1'),
      error: false,
      rightBtn: this.$t('btn_save'),
      groupDialog: false,
      searchApp: '',
      sortNo: null,
      sortNo2: null,
      headCol: ['index', 'name_th', 'category_name_en', 'type_login', 'status'],
      list: [],
      enableType: false,
      mainList: [],
      editRow: this.data,
      mainSort: {
        feild: 'name_th',
        orderby: true
      },
      mainSort2: {
        feild: 'name_th',
        orderby: true
      },
      enableBtn: true,
      masterList: [],
      masterEdit: {},
      nameTh: this.data.name_th,
      nameEn: this.data.name_en,
      tempList: []
    }
  },
  computed: {},
  watch: {
    searchApp: {
      handler: function (todos) {
        let tempData = JSON.parse(JSON.stringify(this.masterList))
        if (todos.trim().length > 1) {
          let keyword = todos
          // let keyword = todos.trim()
          let temp = []
          for (let i = 0; i < tempData.length; i++) {
            let type =
              tempData[i].type_login == 0
                ? 'ผู้ใช้งานบนแอปพลิเคชัน'
                : 'LDAP (AP)'
            let str2 =
              tempData[i].name_th +
              tempData[i].name_en +
              tempData[i].category_name_th +
              tempData[i].category_name_en +
              tempData[i].category_name_en +
              tempData[i].description_en +
              tempData[i].description_th +
              tempData[i].type_login +
              type
            let str = str2.toUpperCase()
            if (str.indexOf(keyword.toUpperCase()) >= 0) {
              tempData[i].index = i
              temp.push(tempData[i])
            }
          }
          this.list = temp
        } else if (todos.trim().length == 0) {
          this.list = tempData
        }
      }
    },
    nameTh: {
      handler: function (todos) {
        let temp = todos.replace(/[`"']/g, '')
        if (temp.length > 0) {
          this.nameTh = temp
        } else {
          this.nameTh = ''
        }
        this.enableBtnSave()
      }
    },
    nameEn: {
      handler: function (todos) {
        let temp = todos.replace(/[`"']/g, '')
        if (temp.length > 0) {
          this.nameEn = temp
        } else {
          this.nameEn = ''
        }
        this.enableBtnSave()
      }
    }
  },
  methods: {
    SaveGroup () {
      let results = this.tempList.filter(a => a.selected)
      // let results = this.list.filter(a => a.selected)
      let data = []
      for (let i = 0; i < results.length; i++) {
        results[i].index = i
        data.push(results[i])
      }
      this.editRow.app = data
      this.groupDialog = false
      this.searchApp = ''
      this.masterList = []
      console.log(this.tempList)
      this.tempList = []
      this.list = []
      this.enableBtnSave()
    },
    selectedCHK ($event, item) {
      console.log($event)
      console.log(item)
      var result = this.tempList.findIndex(row => row.app_id == item.app_id)
      if (result >= 0) {
        if ($event) {
          // console.log('1 >>>')
        } else {
          // console.log('2 >>>')
          this.tempList = this.tempList.filter(a => a.app_id !== item.app_id)
          var result = this.masterList.findIndex(
            row => row.app_id == item.app_id
          )
          if (result >= 0) {
            this.masterList[result].selected = false
          }
        }
        // this.tempList[result].selected = true
      } else {
        // console.log('3 >>>')
        this.tempList.push(item)
        var result = this.masterList.findIndex(row => row.app_id == item.app_id)
        if (result >= 0) {
          this.masterList[result].selected = true
        }
      }
    },
    CloseGroup () {
      this.groupDialog = false
    },
    renderText (row) {
      return row.type_login == 0
        ? this.$t('app.text20')
        : this.$t('master.type_login_1')
    },
    sort (feild, index) {
      this.sortNo = this.sortNo == index ? null : index
      let table = this.editRow.app
      if (feild == 'index' || feild == 'type_login' || feild == 'status') {
        if (this.mainSort.orderby) {
          this.editRow.app = table.sort(function (a, b) {
            return b[feild] - a[feild]
          })
        } else {
          this.editRow.app = table.sort(function (a, b) {
            return a[feild] - b[feild]
          })
        }
        this.mainSort.orderby = !this.mainSort.orderby
      } else {
        if (this.mainSort.feild == feild) {
          this.mainSort.orderby = !this.mainSort.orderby
        } else {
          this.mainSort.orderby = false
        }
        this.mainSort.feild = feild

        if (this.mainSort.orderby) {
          this.editRow.app = table.sort((a, b) =>
            String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
              ? -1
              : 1
          )
        } else {
          this.editRow.app = table.sort((a, b) =>
            String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
              ? 1
              : -1
          )
        }
      }
      let temp = []
      let masterTemp = JSON.parse(JSON.stringify(this.editRow.app))
      for (let i = 0; i < masterTemp.length; i++) {
        if (feild !== 'index') {
          masterTemp[i].index = i
        }
        temp.push(masterTemp[i])
      }
      this.editRow.app = temp
    },
    sort2 (feild, index) {
      this.sortNo2 = this.sortNo2 == index ? null : index
      if (feild == 'index') {
        if (this.mainSort2.orderby) {
          this.list = this.list.sort(function (a, b) {
            return b.index - a.index
          })
        } else {
          this.list = this.list.sort(function (a, b) {
            return a.index - b.index
          })
        }
        this.mainSort2.orderby = !this.mainSort2.orderby
      } else {
        if (this.mainSort2.feild == feild) {
          this.mainSort2.orderby = !this.mainSort2.orderby
        } else {
          this.mainSort2.orderby = false
        }
        this.mainSort2.feild = feild

        let req = {
          keyword: this.searchApp.trim(),
          field: this.mainSort2.feild,
          sort: this.mainSort2.orderby ? 'asc' : 'desc'
        }
        this.$store.dispatch('getAppList', req).then(res => {
          this.mapList(res, 'sort')
        })
      }
    },
    mapList (res, mode) {
      let temp = mode == 'open' ? this.editRow.app : this.tempList
      for (let i = 0; i < temp.length; i++) {
        var result = res.data.findIndex(row => row.app_id == temp[i].app_id)
        if (result >= 0) {
          res.data[result].selected = true
        }
      }
      this.list = res.data
    },
    openPopup () {
      let req = {
        keyword: this.searchApp.trim(),
        field: this.mainSort2.feild,
        sort: this.mainSort2.orderby ? 'asc' : 'desc'
      }
      this.$store.dispatch('getAppList', req).then(res => {
        this.mapList(res, 'open')
        this.tempList = this.list.filter(a => a.selected)
        this.masterList = res.data
        this.groupDialog = true
      })
    },
    CloseDialogs () {
      this.groupDialog = false
      this.searchApp = ''
    },
    saveBtn () {
      this.error = false
      this.btnClick = 'save'
      let item = this.editRow
      if (this.enableBtn == false) {
        this.dialog = true
        this.errorDialog = this.$t('popup.text1')
        this.rightBtn = this.$t('btn_save')
      } else {
        console.log('Valid...', item)
      }
    },
    enableBtnSave () {
      let item = this.editRow
      let name_th = this.nameTh.trim()
      let name_en = this.nameEn.trim()
      let list = item.app
      if (name_th.length > 0 && name_en.length > 0 && list.length > 0) {
        this.enableBtn = false
      } else {
        this.enableBtn = true
      }
    },
    clear () {
      let result = {
        group_id: this.editRow.group_id,
        name_th: this.nameTh,
        name_en: this.nameEn
      }
      this.$store
        .dispatch('deleteGroupList', result)
        .then(res => {
          if (res.data.success == undefined) {
            if (res.status == 222) {
              this.btnClick = 'error'
              this.dialog = true
              this.errorDialog = this.$t('popup.text7')
              this.error = true
            } else {
              this.btnClick = 'error'
              this.dialog = true
              this.error = true
              this.errorDialog =
                this.$t('popup.text2') + ' (Error Code ' + res.status + ')'
            }
          } else {
            this.error = false
            this.dialog = false
            this.$emit('clear', null)
          }
        })
        .catch(error => {})
    },
    cancelBtn () {
      let str1 = this.masterEdit
      let result = JSON.parse(JSON.stringify(this.editRow))
      result.name_th = this.nameTh
      result.name_en = this.nameEn
      let str2 = JSON.stringify(result)

      if (str1 == str2) {
        this.cancel()
      } else {
        this.btnClick = 'cancel'
        this.dialog = true
        this.errorDialog = this.$t('popup.text6')
        this.rightBtn = this.$t('btn_ok')
      }
    },
    cancel () {
      if (!this.dialog) {
        this.$emit('cancel', null)
      }
      this.dialog = false
      this.error = false
      this.rightBtn = this.$t('btn_save')
    },
    clearBtn () {
      this.error = false
      this.btnClick = 'clear'
      this.dialog = true
      this.errorDialog = this.$t('popup.text3')
      this.rightBtn = this.$t('btn_delete')
    },
    save () {
      if (this.btnClick == 'save') {
        let url =
          this.editRow.mode == 'add' ? 'AddGroupList' : 'updateGroupList'

        let result = {
          name_th: this.nameTh,
          name_en: this.nameEn,
          app_id: this.editRow.app.map(a => a.app_id)
        }
        if (this.editRow.mode == 'edit') {
          result.group_id = this.editRow.group_id
        }
        this.$store.dispatch(url, result).then(res => {
          if (res.data.success == undefined) {
            this.btnClick = 'error'
            this.dialog = true
            this.error = true
            this.errorDialog = this.$t('popup.text10')
            this.rightBtn = this.$t('btn_close')
          } else {
            this.error = false
            this.$emit('save', null)
            this.dialog = false
          }
        })
      } else if (this.btnClick == 'clear') {
        this.clear()
      } else if (this.btnClick == 'cancel') {
        this.error = false
        this.dialog = false
        this.rightBtn = this.$t('btn_save')
        this.$emit('cancel', null)
      } else {
        this.error = false
        this.dialog = false
      }
    }
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
    if (this.editRow.mode == 'edit') {
      let mode = this.editRow.mode
      let result = {
        group_id: this.editRow.group_id
      }
      this.$store.dispatch('groupDetail', result).then(res => {
        let result = res.data.app
        let feild = 'name_th'
        this.editRow = res.data
        result = result.sort((a, b) =>
          String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
            ? 1
            : -1
        )
        let temp = []
        for (let i = 0; i < result.length; i++) {
          result[i].index = i
          temp.push(result[i])
        }
        this.editRow.app = temp
        this.editRow.mode = mode
        this.masterEdit = JSON.stringify(this.editRow)
        this.enableBtnSave()
      })
    } else {
      this.masterEdit = JSON.stringify(this.editRow)
      // this.editRow.name_th = ''
      // this.editRow.name_en = ''
    }
  },
  mounted () {}
}
</script>
