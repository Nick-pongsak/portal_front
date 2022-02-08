<template>
  <div id="user-list" style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px;height: calc(100% - 10px);">
      <div class="detail-add">
        <div class="rows">
          <div style="width:20%" class="rows-name">ประเภทการเข้าใช้งานระบบ</div>
          <div style="width:62%" class="rows-input">
            <v-radio-group v-model="editRow.type_login" style="display:flex">
              <div class="radio" style="margin-right: 65px;">
                <v-radio
                  :color="'#CE1212'"
                  :value="1"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
                <div>LDAP (AD)</div>
              </div>
              <div class="radio">
                <v-radio
                  :color="'#CE1212'"
                  :value="0"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
                <div>ผู้ใช้งานบนแอปพลิเคชัน</div>
              </div>
            </v-radio-group>
          </div>
          <div style="width:18%;display:flex" class="rows-input">
            <v-checkbox
              color="red"
              v-model="editRow.status_permission"
              hide-details
            ></v-checkbox>
            <div style="padding-top:4px">ผู้ดูแลระบบ</div>
          </div>
        </div>
        <div class="rows">
          <div style="width:20%" class="rows-name">ค้นหาพนักงาน</div>
          <div style="width:80%;display:flex" class="rows-input">
            <div class="input-with-icon" style="width: 200px;">
              <v-combobox
                id="combobox-user-list"
                v-model="editRow.emp_code"
                dense
                filled
                hide-selected
                outlined
                solo
                :placeholder="$t('input_selected')"
              ></v-combobox>
            </div>
            <v-btn
              @click="openPopupType()"
              class="cancel-btn"
              style="height:25px;width:32px;margin-left:8px"
            >
              <v-icon
                v-text="'mdi-cog'"
                style="color:#ffffff"
                size="18"
              ></v-icon>
            </v-btn>
          </div>
        </div>
        <div class="rows">
          <div style="width:20%" class="rows-name">รหัสพนักงาน</div>
          <div style="width:80%" class="rows-input">
            <div class="input-with-icon" style="width: 200px;">
              <input
                type="text"
                v-model="editRow.emp_code"
                :placeholder="$t('input_selected')"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:50%;display: flex;">
            <div style="width:40%" class="rows-name">ชื่อ - นามสกุล (TH)</div>
            <div style="width:60%" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.name_th"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              ชื่อ - นามสกุล (EN)
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.name_en"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:50%;display: flex;">
            <div style="width:40%" class="rows-name">ชื่อเล่น (TH)</div>
            <div style="width:60%" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.nickname1_th"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              ชื่อเล่น (EN)
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.nickname1_en"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:50%;display: flex;">
            <div style="width:40%" class="rows-name">ฉายา (TH)</div>
            <div style="width:60%" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.nickname2_th"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              ฉายา (EN)
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.nickname2_en"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:50%;display: flex;">
            <div style="width:40%" class="rows-name">ตำแหน่งงาน (TH)</div>
            <div style="width:60%" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.postname_th"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              ตำแหน่งงาน (EN)
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.postname_en"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:50%;display: flex;">
            <div style="width:40%" class="rows-name">อีเมล</div>
            <div style="width:60%" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.email"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              3CX
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.phone"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="rows" style="padding-bottom:3px">
          <div style="width:50%;display: flex;">
            <div style="width:40%" class="rows-name">เบอร์โทร</div>
            <div style="width:60%" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.phone"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              สถานะ
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <v-radio-group v-model="editRow.status" style="display:flex">
                <div class="radio" style="margin-right: 30px;">
                  <v-radio
                    :color="'#CE1212'"
                    :value="1"
                    :ripple="false"
                    :messages="false"
                    :light="false"
                  ></v-radio>
                  <div>เปิดใช้งาน</div>
                </div>
                <div class="radio">
                  <v-radio
                    :color="'#CE1212'"
                    :value="0"
                    :ripple="false"
                    :messages="false"
                    :light="false"
                  ></v-radio>
                  <div>ปิดใช้งาน</div>
                </div>
              </v-radio-group>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:20%" class="rows-name">
            กลุ่มผู้ใช้งานแอปพลิเคชัน
          </div>
          <div style="width:80%" class="rows-input">
            <div class="input-with-icon" style="width: 300px;">
              <input
                type="text"
                v-model="editRow.group_name_th"
                :placeholder="$t('input_selected')"
              />
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

    <v-dialog v-model="typeDialog" :max-width="'850'">
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
            {{ 'รายชื่อพนักงานที่พบ' }}
          </div>
          <div class="line-page" style="margin-top:8px"></div>
          <div style="width:100%;margin-top:15px">
            <div style="display:flex;width:100%">
              <div style="width:80%">
                <div class="input-with-icon search-form">
                  <v-icon v-text="'mdi-magnify'" size="20"></v-icon>
                  <input
                    type="text"
                    v-model="searchApp"
                    :placeholder="$t('input_search')"
                  />
                </div>
              </div>
              <div class="right-action justify-end" style="width:20%;">
                <!-- <v-btn @click="AddNewType()" class="cancel-btn">
                  <v-icon
                    v-text="'mdi-plus'"
                    style="color:#ffffff;margin-right:5px;"
                    size="22"
                  ></v-icon>
                  {{ $t('btn_add') }}
                </v-btn> -->
              </div>
            </div>
            <div class="table">
              <div class="head-table">
                <div class="head" style="width:10%" @click="sort('no')">
                  <div class="column-name">No</div>
                  <v-icon
                    v-text="sortNo == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:20%" @click="sort('type_th')">
                  <div class="column-name">รหัสพนักงาน</div>
                  <v-icon
                    v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:40%" @click="sort('type_en')">
                  <div class="column-name">
                    ชื่อ - นามสกุล
                  </div>
                  <v-icon
                    v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:20%" @click="sort('type_en')">
                  <div class="column-name">
                    ตำแหน่ง
                  </div>
                  <v-icon
                    v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:10%">
                  <div class="column-name">
                    {{ $t('set.list_col6') }}
                  </div>
                </div>
              </div>
              <div class="body-table">
                <div
                  class="body-row"
                  v-for="(item, index) in list"
                  :key="'setapp' + index"
                >
                  <div
                    class="body"
                    style="width:10%;padding-left:5px;padding-top:5px"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="body" style="width:20%;padding-top:5px">
                    {{ item.cust_code }}
                  </div>
                  <div class="body" style="width:40%;padding-top:5px">
                    {{ item.name_th }}
                  </div>
                  <div class="body" style="width:20%;padding-top:5px">
                    {{ item.position }}
                  </div>
                  <div class="body" style="width:10%;padding-top:5px">
                    <v-icon
                      @click="EditNewType(item)"
                      v-text="'mdi-pencil'"
                      style="color:#CE1212;cursor:pointer"
                      size="20"
                    ></v-icon>
                    <v-icon
                      @click="DeleteNewType(item)"
                      v-text="'mdi-delete-sweep'"
                      style="color:#CE1212;cursor:pointer;margin-left:10px"
                      size="20"
                    ></v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- </v-card-text> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'user-list',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editRow: this.data,
      dialog: false,
      errorDialog: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?',
      error: false,
      rightBtn: 'บันทึก',
      enableBtn: false,
      typeDialog: false,
      sortNo: null,
      searchApp: '',
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    AddNewType () {
      // this.editMode = true
    },
    EditNewType (item) {
      // this.editMode = true
      // this.NameThInput = item.name_th
      // this.NameEnInput = item.name_en
    },
    DeleteNewType (item) {
      // this.editMode = true
    },
    CloseNewType () {
      // this.editMode = false
      // this.NameThInput = ''
      // this.NameEnInput = ''
    },
    sort (feild) {
      // if (feild == 'no') {
      //   this.sortNo = !this.sortNo
      // } else if (feild == 'type_th') {
      //   this.sortTypeTh = !this.sortTypeTh
      // } else if (feild == 'type_en') {
      //   this.sortTypeEn = !this.sortTypeEn
      // }
    },
    openPopupType () {
      this.typeDialog = true
    },
    CloseDialogs () {
      this.typeDialog = false
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
        this.$emit('save', null)
      }
    },
    onButtonClick () {}
  },
  mounted () {}
}
</script>
