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
                v-model="app_name_th"
                :placeholder="$t('input_selected')"
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
                v-model="app_name_en"
                :placeholder="$t('input_selected')"
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
                <div class="head" style="width:10%" @click="sort(headCol[0], 0)">
                  <div class="column-name">No</div>
                  <v-icon
                    v-text="sortNo == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:30%" @click="sort(headCol[1], 1)">
                  <div class="column-name">แอปพิเคชัน</div>
                  <v-icon
                    v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:20%" @click="sort(headCol[2], 2)">
                  <div class="column-name">
                    หมวดหมู่ (EN)
                  </div>
                  <v-icon
                    v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:25%" @click="sort(headCol[3], 3)">
                  <div class="column-name">
                    การเข้าใช้งาน
                  </div>
                  <v-icon
                    v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:15%" @click="sort(headCol[4], 4)">
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
                  'overflow-y': mainList.length == 0 ? 'hidden' : 'auto'
                }"
              >
                <div v-if="mainList.length == 0" class="no-data">
                  -- ไม่พบรายการ --
                </div>
                <div
                  v-else
                  class="body-row"
                  v-for="(item, index) in mainList"
                  :key="'setapp' + index"
                >
                  <div class="body" style="width:10%;padding-left:5px">
                    {{ index + 1 }}
                  </div>
                  <div class="body" style="width:30%">
                    {{ item.name_th }}
                  </div>
                  <div class="body" style="width:20%">
                    {{ item.type }}
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
          @click="clear()"
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
        <!-- @click="save()" -->
        <!-- @click.stop="dialog = true" -->
        <v-btn
          :class="enableBtn ? 'cancel-btn disabled' : 'cancel-btn'"
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
                <div class="head" style="width:10%" @click="sort('no')">
                  <div class="column-name">No</div>
                  <v-icon
                    v-text="sortNo ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:30%" @click="sort('app')">
                  <div class="column-name">แอปพิเคชัน</div>
                  <v-icon
                    v-text="sortApp ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:20%" @click="sort('type_en')">
                  <div class="column-name">
                    หมวดหมู่ (EN)
                  </div>
                  <v-icon
                    v-text="sortTypeEn ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:25%" @click="sort('access')">
                  <div class="column-name">
                    การเข้าใช้งาน
                  </div>
                  <v-icon
                    v-text="sortAccess ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:15%" @click="sort('status')">
                  <div class="column-name">
                    สถานะ
                  </div>
                  <v-icon
                    v-text="sortStatus ? 'mdi-menu-up' : 'mdi-menu-down'"
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
                    {{ item.type }}
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
              style="padding-top:50px;padding-bottom:50px;display:flex"
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
      app_name_th: '',
      app_name_en: '',
      enableBtn: false,
      dialog: false,
      errorDialog: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?',
      error: false,
      rightBtn: 'บันทึก',
      groupDialog: false,
      searchApp: '',
      sortNo: null,
      headCol: ['index', 'name_th', 'name_en', 'name_en', 'name_en'],
      list: [
        {
          no: 1,
          name_th: 'Corparate Planning',
          type: 'CRM',
          access: 'only',
          status: false,
          selected: false
        },
        {
          no: 2,
          name_th: 'SalesOps',
          type: 'CRM',
          access: 'only',
          status: true,
          selected: true
        },
        {
          no: 3,
          name_th: 'MktOps',
          type: 'CRM',
          access: 'only',
          status: false,
          selected: false
        },
        {
          no: 4,
          name_th: 'myHr',
          type: 'HRS',
          access: 'LDAP',
          status: true,
          selected: true
        },
        {
          no: 5,
          name_th: 'App 5',
          type: 'HRS',
          access: 'LDAP',
          status: true,
          selected: true
        },
        {
          no: 6,
          name_th: 'App 5',
          type: 'HRS',
          access: 'LDAP',
          status: true,
          selected: true
        },
        {
          no: 7,
          name_th: 'App 5',
          type: 'HRS',
          access: 'LDAP',
          status: true,
          selected: true
        },
        {
          no: 8,
          name_th: 'App 5',
          type: 'HRS',
          access: 'LDAP',
          status: true,
          selected: true
        }
      ],
      enableType: false,
      mainList: [],
      editRow: this.data
    }
  },
  computed: {},
  watch: {},
  methods: {
    SaveGroup () {
      this.mainList = this.list.filter(a => a.selected)
      this.groupDialog = false
    },
    CloseGroup () {
      this.groupDialog = false
    },
    renderText (row) {
      if (row.access == 'LDAP') {
        return 'LDAP (AP)'
      } else if (row.access == 'only') {
        return 'ผู้ใช้งานบนแอปพลิเคชัน'
      }
    },
    sort (feild, index) {
      this.sortNo = this.sortNo == index ? null : index
      // if (feild == 'index') {
      // } else {
      if (this.mainSort.feild == feild) {
        this.mainSort.orderby = !this.mainSort.orderby
      } else {
        this.mainSort.orderby = false
      }
      this.mainSort.feild = feild
      this.getTypeList()
      // }
    },
    openPopup () {
      this.groupDialog = true
    },
    CloseDialogs () {
      this.groupDialog = false
    },
    cancel () {
      if (!this.dialog) {
        this.$emit('cancel', null)
      }
      this.dialog = false
      this.rightBtn = 'บันทึก'
    },
    clear () {
      console.log('2==>')
      // this.dialog = true
      this.errorDialog = 'คุณต้องการลบข้อมูลใช่หรือไม่ ?'
      this.rightBtn = 'ลบ'
      // this.dialog = false
      // this.selectedFile = null
      // this.$emit('clear', null)
    },
    save () {
      console.log('3==>')
      this.rightBtn = 'บันทึก'
      if (this.error) {
        this.dialog = false
      } else {
        // this.error = true
        // this.errorDialog =
        //   'ไม่สามารถบันทึกข้อมูลได้ โปรดติดต่อผู้ดูแลระบบ (Error Code 1001)'

        // this.error = true
        // this.errorDialog =
        //   'ข้อมูลแอปพลิเคชันดังกล่าวถูกใช้งานอยู่ในเมนู "จัดกลุ่มผู้ใช้งานแอปพลิเคชัน" กรุณายืนยัน การดำเนินการ'

        this.dialog = false
        this.selectedFile = null
        this.$emit('save', null)
      }
    }
  },
  mounted () {}
}
</script>
