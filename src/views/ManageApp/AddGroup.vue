<template>
  <div style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px;height: calc(100% - 10px);">
      <div class="detail-add" style="overflow:hidden">
        <div class="rows">
          <div style="width:30%" class="rows-name">
            ชื่อกลุ่มผู้ใช้งานแอปพลิเคชัน (TH)
          </div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="editRow.name_th"
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
            ชื่อกลุ่มผู้ใช้งานแอปพลิเคชัน (EN)
          </div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="editRow.name_en"
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
            แอปพลิเคชันที่สามารถเข้าใช้งานได้
          </div>
          <div style="width:70%" class="rows-input">
            <v-btn class="cancel-btn" style="width:200px" @click="openPopup">
              {{ 'เพิ่ม/แก้ไข' }}
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
                  <div class="column-name">No</div>
                  <v-icon
                    v-text="sortNo == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:30%"
                  @click="sort(headCol[1], 1)"
                >
                  <div class="column-name">แอปพิเคชัน</div>
                  <v-icon
                    v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:20%"
                  @click="sort(headCol[2], 2)"
                >
                  <div class="column-name">
                    หมวดหมู่ (EN)
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
                    การเข้าใช้งาน
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
                    สถานะ
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
                  'overflow-y': editRow.app.length == 0 ? 'hidden' : 'auto'
                }"
              >
                <div v-if="editRow.app.length == 0" class="no-data">
                  -- ไม่พบรายการ --
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
                    {{ item.name_th }}
                  </div>
                  <div class="body" style="width:20%">
                    {{ item.category_name_en }}
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
                    {{ item.status == true ? 'เปิดใช้งาน' : 'ปิดการใช้งาน' }}
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
          @click="cancel()"
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
            ยกเลิก
          </v-btn>
          <v-btn text @click="save()" class="save">
            {{ error ? 'ปิด' : rightBtn }}
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
            {{ 'การจัดการหมวดหมู่ของแอปพลิเคชัน' }}
          </div>
          <div class="line-page" style="margin-top:8px"></div>
          <div style="width:100%;margin-top:15px">
            <div style="display:flex;width:100%">
              <div class="input-with-icon search-form">
                <v-icon v-text="'mdi-magnify'" size="20"></v-icon>
                <input
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
                  <div class="column-name">No</div>
                  <v-icon
                    v-text="sortNo2 == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:30%"
                  @click="sort2(headCol[1], 1)"
                >
                  <div class="column-name">แอปพิเคชัน</div>
                  <v-icon
                    v-text="sortNo2 == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:20%"
                  @click="sort2(headCol[2], 2)"
                >
                  <div class="column-name">
                    หมวดหมู่ (EN)
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
                    การเข้าใช้งาน
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
                    สถานะ
                  </div>
                  <v-icon
                    v-text="sortNo2 == 4 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
              </div>
              <div class="body-table">
                <div
                  class="body-row"
                  v-for="(item, index) in list"
                  :key="'setapp' + index"
                >
                  <div class="body" style="width:10%;padding-left:5px">
                    <v-checkbox
                      color="red"
                      v-model="item.selected"
                      hide-details
                    ></v-checkbox>
                  </div>
                  <div class="body" style="width:30%">
                    {{ item.name_th }}
                  </div>
                  <div class="body" style="width:20%">
                    {{ item.category_name_en }}
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
                    {{ item.status == true ? 'เปิดใช้งาน' : 'ปิดการใช้งาน' }}
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
      errorDialog: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?',
      error: false,
      rightBtn: 'บันทึก',
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
      enableBtn: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    SaveGroup () {
      let results = this.list.filter(a => a.selected)
      let data = []
      for (let i = 0; i < results.length; i++) {
        results[i].index = i
        data.push(results[i])
      }
      this.editRow.app = data
      this.groupDialog = false
      this.enableBtnSave()
    },
    CloseGroup () {
      this.groupDialog = false
    },
    renderText (row) {
      if (row.type_login == 1) {
        return 'LDAP (AP)'
      } else if (row.type_login == 0) {
        return 'ผู้ใช้งานบนแอปพลิเคชัน'
      }
    },
    sort (feild, index) {
      this.sortNo = this.sortNo == index ? null : index
      let table = this.editRow.app
      if (feild == 'index' || feild == 'type_login' || feild == 'status') {
        if (this.mainSort.orderby) {
          this.editRow.app = table.sort(function (a, b) {
            return b.index - a.index
          })
        } else {
          this.editRow.app = table.sort(function (a, b) {
            return a.index - b.index
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
          this.mapList(res)
        })
      }
    },
    mapList (res) {
      for (let i = 0; i < this.editRow.app.length; i++) {
        var result = res.data.findIndex(
          row => row.app_id == this.editRow.app[i].app_id
        )
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
        this.mapList(res)
        this.groupDialog = true
      })
    },
    CloseDialogs () {
      this.groupDialog = false
      this.searchApp = ''
    },
    saveBtn () {
      this.btnClick = 'save'
      let item = this.editRow
      if (this.enableBtn == false) {
        this.dialog = true
        this.errorDialog = 'คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?'
        this.rightBtn = 'บันทึก'
      } else {
        console.log('Valid...', item)
      }
    },
    enableBtnSave () {
      let item = this.editRow
      let name_th = item.name_th.trim()
      let name_en = item.name_en.trim()
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
        name_th: this.editRow.name_th,
        name_en: this.editRow.name_en
      }
      this.$store
        .dispatch('deleteGroupList', result)
        .then(res => {
          if (res.data.success == undefined) {
            if (res.status == 222) {
              this.btnClick = 'error'
              this.dialog = true
              this.errorDialog =
                'ไม่สามารถลบข้อมูลได้ เนื่องจากพบการใช้งาน ข้อมูลดังกล่าวอยู่ กรุณาตรวจสอบอีกครั้ง'
              this.error = true
            } else {
              this.btnClick = 'error'
              this.dialog = true
              this.error = true
              this.errorDialog =
                'ไม่สามารถบันทึกข้อมูลได้ โปรดติดต่อผู้ดูแลระบบ (Error Code ' +
                res.status +
                ')'
              // this.rightBtn = 'ยืนยัน'
            }
          } else {
            this.dialog = false
            this.$emit('clear', null)
          }
        })
        .catch(error => {})
    },
    cancel () {
      if (!this.dialog) {
        this.$emit('cancel', null)
      }
      this.dialog = false
      this.rightBtn = 'บันทึก'
    },
    clearBtn () {
      this.btnClick = 'clear'
      this.dialog = true
      this.errorDialog = 'คุณต้องการลบข้อมูลใช่หรือไม่ ?'
      this.rightBtn = 'ลบ'
    },
    save () {
      if (this.btnClick == 'save') {
        let url =
          this.editRow.mode == 'add' ? 'AddGroupList' : 'updateGroupList'

        let result = {
          name_th: this.editRow.name_th,
          name_en: this.editRow.name_en,
          app_id: this.editRow.app.map(a => a.app_id)
        }
        if (this.editRow.mode == 'edit') {
          result.group_id = this.editRow.group_id
        }
        this.$store.dispatch(url, result).then(res => {
          this.$emit('save', null)
          this.dialog = false
        })
      } else if (this.btnClick == 'clear') {
        this.clear()
      } else {
        this.dialog = false
      }
    }
  },
  created () {
    if (this.editRow.mode == 'edit') {
      let mode = this.editRow.mode
      let result = {
        group_id: this.editRow.group_id
      }
      this.$store.dispatch('groupDetail', result).then(res => {
        let result = []
        for (let i = 0; i < res.data.app.length; i++) {
          res.data.app[i].index = i
          result.push(res.data.app[i])
        }
        let feild = 'name_th'
        this.editRow = res.data
        result = result.sort((a, b) =>
          String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
            ? 1
            : -1
        )
        this.editRow.app = result
        this.editRow.mode = mode
        this.enableBtnSave()
      })
    } else {
      // this.editRow.name_th = ''
      // this.editRow.name_en = ''
    }
  },
  mounted () {}
}
</script>
