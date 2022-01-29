<template>
  <div class="header-main">
    <v-row no-gutters>
      <v-col cols="12" xs="5" sm="4" md="4" style="display:flex">
        <img src="@/assets/icons/logo.png" style="height:45px" />
        <div class="sys-name">DHAS PORTAL</div>
      </v-col>
      <v-col cols="12" xs="7" sm="8" md="8" class="right-header">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-avatar size="38">
                <img src="@/assets/icons/language.svg" alt="language" />
              </v-avatar>
              <span style="margin-left:17px;font-weight:400">
                {{ language }}
              </span>
              <img
                src="@/assets/icons/arrow_drop_down_white.svg"
                alt="open"
                style="margin-left:18px;"
              />
            </div>
          </template>
          <v-list id="change-languages-body">
            <div class="first">
              <div class="text" @click="SetLanguages('TH')">
                ภาษาไทย (TH)
              </div>
              <v-img
                v-show="language == 'TH'"
                src="@/assets/icons/done.svg"
                style="margin-right:5px;height:18px;width:18px"
              ></v-img>
            </div>
            <div class="second">
              <div class="text" @click="SetLanguages('EN')">
                ภาษาอังกฤษ (EN)
              </div>
              <v-img
                v-show="language == 'EN'"
                src="@/assets/icons/done.svg"
                style="margin-right:5px;height:18px;width:18px"
              ></v-img>
            </div>
          </v-list>
        </v-menu>
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              style="display:flex;padding-left:2%"
            >
              <div>
                <v-avatar size="50" v-show="showDefaultAccount">
                  <div class="deafult-name">{{ accountNameEng }}</div>
                </v-avatar>
                <v-avatar v-show="!showDefaultAccount" size="37">
                  <v-img src="@/assets/icons/account_demo.png"></v-img>
                </v-avatar>
              </div>
              <div style="margin-left:14px;">
                <div class="account-name">{{ accountName }}</div>
                <div class="account-name" style="padding-top:1px">
                  {{ position }}
                </div>
              </div>
              <img
                src="@/assets/icons/arrow_drop_down_white.svg"
                alt="open"
                style="padding-left: 19px;
                      width: 48px;
                      padding-top: 10px;
                      height: 40px;"
              />
            </div>
          </template>
          <v-list
            id="account-menu-body"
            :style="{ height: permissinoAccount ? '385px' : '340px' }"
          >
            <div class="logo-line" @click="UploadPic()">
              <v-badge
                avatar
                bordered
                overlap
                bottom
                offset-x="24"
                offset-y="24"
              >
                <template v-slot:badge>
                  <v-avatar style="background:white;border: 1px solid #D1D1D1;">
                    <img
                      style="width:13px"
                      src="@/assets/icons/camera.svg"
                      alt="camera"
                    />
                  </v-avatar>
                </template>

                <v-avatar v-show="!showDefaultAccount" size="100">
                  <v-img src="@/assets/icons/account_demo.png"></v-img>
                </v-avatar>
                <div v-show="showDefaultAccount" class="deafult-name">
                  {{ accountNameEng }}
                </div>
              </v-badge>
            </div>
            <div class="account">
              <div class="account-name">
                {{ accountName }}
              </div>
              <div class="position-name">
                {{ position }}
              </div>
            </div>
            <!-- <div style="text-align:center;padding-bottom:20px">
              <v-chip class="account-chip">
                {{ status_account }}
              </v-chip>
            </div> -->
            <div
              :style="{
                'text-align': 'center',
                'padding-bottom': permissinoAccount ? '10px' : '20px',
                'padding-top': '15px'
              }"
            >
              <v-chip
                class="account-chip"
                style="width:200px"
                @click="SettingApp()"
              >
                {{ 'จัดการรายการแอปพลิเคชัน' }}
              </v-chip>
            </div>
            <div
              style="text-align:center;padding-bottom:20px;"
              v-show="permissinoAccount"
            >
              <v-chip
                class="account-chip"
                @click="ChangePassword()"
                style="width:200px"
              >
                {{ 'เปลี่ยนรหัสผ่าน' }}
              </v-chip>
            </div>
            <div class="line-page"></div>
            <div class="account-button">
              <!-- <v-btn
                class="ok-btn"
                style="margin-right:35px"
                v-show="permissinoAccount"
                @click="ChangePassword()"
              >
                {{ okBtn }}
              </v-btn> -->
              <v-btn class="cancel-btn" @click="LoginOut()">
                {{ cancelBtn }}
              </v-btn>
            </div>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <!---Dialogs-->
    <v-dialog v-model="picDialog" width="600" :no-click-animation="false">
      <v-card id="change-pic-dialogs">
        <v-card-text style="padding:unset">
          <div class="justify-end" style="display: flex;">
            <v-btn icon @click="CloseDialogs()" style="height:20px;width:20px">
              <v-img src="@/assets/icons/close.svg"></v-img>
            </v-btn>
          </div>
          <div
            style=" display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top:20px"
          >
            <v-avatar v-show="!showDefaultAccount" size="230">
              <v-img src="@/assets/icons/account_demo.png"> </v-img>
              <!-- <img :src="`${profilePicPath}`"/> -->
              <!-- <img src="@/assets/icons/account_demo.png"/> -->
              <!-- <v-img :src="`${profilePicPath}`"></v-img> -->
              <!-- <v-img :src="`${profilePicPath}`"></v-img> -->
            </v-avatar>
            <div v-show="showDefaultAccount" class="deafult-name">
              {{ accountNameEng }}
            </div>
          </div>
          <div class="profile-desc">
            {{ renderProfileDesc() }}
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            v-show="showEditPic && stepChangePic != 3"
            text
            @click="DeletePic()"
            class="ok-btn"
            :style="{ 'margin-right': stepChangePic == 4 ? '' : '35px' }"
          >
            <v-img
              v-show="stepChangePic == 1"
              src="@/assets/icons/delete.svg"
              style="margin-right:5px;height:18px;width:18px"
            ></v-img>
            {{ renderBtnLeft() }}
          </v-btn>

          <v-btn
            text
            @click="ChangePic()"
            class="cancel-btn"
            v-show="stepChangePic < 2"
          >
            <v-img
              src="@/assets/icons/edit.svg"
              style="margin-right:5px;height:19px;width:19px"
            ></v-img>
            {{ 'เปลี่ยน' }}
          </v-btn>

          <div v-show="stepChangePic == 2 && stepChangePic != 3">
            <v-btn
              class="cancel-btn"
              :loading="isSelecting"
              @click="onButtonClick"
            >
              {{ 'อัปโหลด' }}
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="image/*"
              @change="onFileChanged"
            />
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="pwdDialog" width="600" :no-click-animation="false">
      <v-card id="change-pwd-dialogs">
        <v-card-text v-if="stepChangePwd == 0" style="padding:unset">
          <div
            style="color:#797979;
                      font-size:24px;
                      font-family:kanit;
                      text-align:center"
          >
            {{ 'กรุณายืนยันตัวตน' }}
          </div>
          <div
            style="color:#414141;
                      font-size:18px;
                      font-family:kanit;
                      padding-top:90px;
                      display:flex"
          >
            <div style="padding-top:8px">{{ 'รหัสผ่านปัจจุบัน' }}</div>
            <div class="input-with-icon" :class="{ active: errorPwd }">
              <input
                type="password"
                v-model="password"
                @keypress="IsNumber"
                :placeholder="'โปรดระบุ'"
              />
            </div>
          </div>
          <div
            v-show="errorPwd"
            style="padding-left:175px;
                    padding-top:8px;
                    color: #ED2024;
                    font-family:kanit;
                    font-size:14px"
          >
            รหัสผ่านไม่ถูกต้อง
          </div>
        </v-card-text>
        <v-card-text v-else style="padding:unset">
          <div v-show="stepChangePwd < 2">
            <div
              style="color:#414141;
                      font-size:18px;
                      font-family:kanit;
                      display:flex"
            >
              <div style="padding-top:8px">{{ 'รหัสผ่านใหม่' }}</div>
              <div
                class="input-with-icon"
                style="margin-left:72px"
                :class="{ active: errorNewPassword }"
              >
                <input
                  type="password"
                  v-model="newPassword"
                  :placeholder="'โปรดระบุ'"
                  @keypress="IsNumber"
                  @keyup="InCondition"
                />
              </div>
            </div>
            <!-- <div
              v-show="errorNewPassword"
              style="padding-left:163px;
                    padding-top:8px;
                    color: #ED2024;
                    font-family:kanit;
                    font-size:14px"
            >
              รหัสผ่านไม่ถูกต้อง
            </div> -->
          </div>
          <div v-show="stepChangePwd < 2">
            <div
              style="color:#414141;
                      font-size:18px;
                      font-family:kanit;
                      padding-top:30px;
                      display:flex"
            >
              <div style="padding-top:8px">{{ 'ยืนยันรหัสผ่าน' }}</div>
              <div
                class="input-with-icon"
                :class="{ active: errorCfNewPassword }"
              >
                <input
                  type="password"
                  v-model="cfNewPassword"
                  @keypress="IsNumber"
                  :placeholder="'โปรดระบุ'"
                />
              </div>
            </div>
            <!-- <div
              v-show="errorCfNewPassword"
              style="padding-left:163px;
                    padding-top:8px;
                    color: #ED2024;
                    font-family:kanit;
                    font-size:14px"
            >
              รหัสผ่านไม่ถูกต้อง
            </div> -->
          </div>
          <div
            v-show="stepChangePwd < 2"
            style="
                    padding-top:30px;
                    color: #767676;
                    font-family:kanit;
                    font-size:14px"
          >
            หมายเหตุ - รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษรและประกอบไปด้วย<br />
            1) ตัวเลข 0 - 9 <br />
            2) ตัวอักษรภาษาอังกฤษตัวพิมพ์เล็กหรือพิมพ์ใหญ่
          </div>
          <div v-show="stepChangePwd == 2">
            <div
              style="display: flex;
                  align-items: center;
                  justify-content: center"
            >
              <v-avatar style="background:#66BB6A;width:90px;height:90px">
                <v-icon style="color:white">
                  mdi-check
                </v-icon>
              </v-avatar>
            </div>
            <div
              style="color:#797979;
                      font-size:24px;
                      margin-top:50px;
                      font-family:kanit;
                      text-align:center"
            >
              {{ 'เปลี่ยนรหัสผ่านสำเร็จ' }}
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center" style="padding-top:80px">
          <v-btn
            text
            @click="ClosePwdDialogs()"
            class="ok-btn"
            :style="{ 'margin-right': stepChangePwd == 2 ? '0px' : '35px' }"
          >
            {{ stepChangePwd == 2 ? 'ปิด' : 'ยกเลิก' }}
          </v-btn>

          <v-btn
            v-show="stepChangePwd < 2"
            text
            @click="ConfirmDialogs()"
            class="cancel-btn"
            :disabled="disPwdBtn"
          >
            {{ stepChangePwd == 0 ? 'ยืนยัน' : 'เปลี่ยนรหัสผ่าน' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="setAppDialog" width="800" :no-click-animation="false">
      <v-card id="set-app-dialogs">
        <v-card-text style="padding:30px 30px 30px 70px">
          <div class="justify-end" style="display: flex">
            <v-btn
              icon
              @click="CloseSetAppDialogs()"
              style="height:20px;width:20px"
            >
              <v-img src="@/assets/icons/close.svg"></v-img>
            </v-btn>
          </div>
          <div style="padding-right:40px">
            <div
              style="color:#797979;
                      font-size:24px;
                      font-family:kanit"
            >
              {{ 'รายการแอปพลิเคชันของคุณ' }}
            </div>
            <div class="line-page" style="margin-top:8px"></div>
            <div style="width:100%;margin-top:15px">
              <div class="input-with-icon" style="display: flex;width: 300px;">
                <img
                  style="color:#000000;opacity:0.5;margin-right:8px"
                  src="@/assets/icons/search.svg"
                  alt="search"
                  class="sesrch"
                />
                <input type="text" v-model="searchApp" :placeholder="'ค้นหา'" />
              </div>
              <div class="table">
                <div class="head-table">
                  <div class="head" style="width:10%" @click="sort('no')">
                    <div class="column-name">No</div>
                    <img
                      v-if="sortNo"
                      style="opacity:0.5;margin-left:8px"
                      src="@/assets/icons/arrow_drop_up_black.svg"
                      alt="sort"
                    />
                    <img
                      v-else
                      style="opacity:0.5;margin-left:8px"
                      src="@/assets/icons/arrow_drop_down_black.svg"
                      alt="sort"
                    />
                  </div>
                  <div class="head" style="width:30%" @click="sort('name')">
                    <div class="column-name">แอปพิเคชั่น</div>
                    <img
                      v-if="sortAppName"
                      style="opacity:0.5;margin-left:8px"
                      src="@/assets/icons/arrow_drop_up_black.svg"
                      alt="sort"
                    />
                    <img
                      v-else
                      style="opacity:0.5;margin-left:8px"
                      src="@/assets/icons/arrow_drop_down_black.svg"
                      alt="sort"
                    />
                  </div>
                  <div class="head" style="width:60%" @click="sort('user')">
                    <div class="column-name">
                      ชื่อผู้ใช้งานในการเข้าสู่ระบบด้วย SSO
                    </div>
                    <img
                      v-if="sortUser"
                      style="opacity:0.5;margin-left:8px"
                      src="@/assets/icons/arrow_drop_up_black.svg"
                      alt="sort"
                    />
                    <img
                      v-else
                      style="opacity:0.5;margin-left:8px"
                      src="@/assets/icons/arrow_drop_down_black.svg"
                      alt="sort"
                    />
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
                      {{ item.no }}
                    </div>
                    <div class="body" style="width:30%;padding-top:5px">
                      {{ item.app_name }}
                    </div>
                    <div class="body" style="width:60%;display:flex">
                      <div style="padding-top:5px;margin-right:15px">
                        {{ renderText(item) }}
                      </div>
                      <div
                        v-show="item.user_status == 'web_portal'"
                        :class="
                          editRow == index
                            ? 'input-with-icon able-input'
                            : 'input-with-icon disabled-input'
                        "
                        style="display: flex;width: 200px;height: 32px;margin-right:10px"
                      >
                        <input
                          type="text"
                          v-model="item.user_name"
                          :placeholder="'-- โปรดระบุ --'"
                        />
                      </div>
                      <v-btn
                        v-show="item.user_status == 'web_portal'"
                        text
                        @click="edit(item, index)"
                        class="cancel-btn"
                      >
                        {{ editRow == index ? 'เพิ่ม' : 'เปลี่ยน' }}
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="justify-center" style="padding-top:80px">
          <!-- <v-btn
            text
            @click="ClosePwdDialogs()"
            class="ok-btn"
            :style="{ 'margin-right': stepChangePwd == 2 ? '0px' : '35px' }"
          >
            {{ stepChangePwd == 2 ? 'ปิด' : 'ยกเลิก' }}
          </v-btn>

          <v-btn
            v-show="stepChangePwd < 2"
            text
            @click="ConfirmDialogs()"
            class="cancel-btn"
            :disabled="disPwdBtn"
          >
            {{ stepChangePwd == 0 ? 'ยืนยัน' : 'เปลี่ยนรหัสผ่าน' }}
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'headers',
  props: {},
  data () {
    return {
      profilePicPath: '@/assets/icons/account_demo.png',
      language: 'TH',
      accountName: 'กิตติชัย กำแพงทอง',
      accountNameEng: 'K',
      position: 'Product Manager (IT)',
      okBtn: 'เปลี่ยนรหัสผ่าน',
      cancelBtn: 'ออกจากระบบ',
      status_account: 'ผู้ดูแลระบบ',
      stepChangePic: 0,
      showDefaultAccount: false,
      permissinoAccount: true,
      picDialog: false,
      showEditPic: false,
      selectedFile: null,
      isSelecting: false,
      pwdDialog: false,
      password: '',
      errorPwd: false,
      error: true,
      disPwdBtn: true,
      stepChangePwd: 0,
      newPassword: '',
      errorNewPassword: false,
      cfNewPassword: '',
      errorCfNewPassword: false,
      setAppDialog: false,
      searchApp: '',
      sortNo: false,
      sortAppName: false,
      sortUser: false,
      list: [
        {
          no: 1,
          app_name: 'Cotporate Planning',
          user_name: 'kittichai',
          user_status: 'web_portal'
        },
        {
          no: 2,
          app_name: 'SalesOps',
          user_name: 'kittichai',
          user_status: 'web_portal'
        },
        {
          no: 3,
          app_name: 'MktOps',
          user_name: 'kittichai',
          user_status: 'LDAP'
        },
        {
          no: 4,
          app_name: 'MyHR',
          user_name: 'kittichai',
          user_status: 'only'
        },
        {
          no: 5,
          app_name: 'Good return',
          user_name: 'kittichai',
          user_status: 'web_portal'
        }
      ],
      editRow: -1
    }
  },
  watch: {
    password (newValue) {
      if (newValue.length >= 6) {
        // this.errorPwd = false
        this.disPwdBtn = false
      } else {
        // this.errorPwd = true
        this.disPwdBtn = true
      }
    },
    newPassword (newValue) {
      let newPassword = JSON.stringify(newValue)
      let cfNewPassword = JSON.stringify(this.cfNewPassword)
      if (newPassword.length == cfNewPassword.length) {
        this.errorNewPassword = newPassword == cfNewPassword ? false : true
      } else if (
        newPassword.length < cfNewPassword.length &&
        cfNewPassword.length > 0
      ) {
        this.errorNewPassword = true
      } else {
        this.errorNewPassword = false
      }

      this.DisableBtn()
    },
    cfNewPassword (newValue) {
      let newPassword = JSON.stringify(this.newPassword)
      let cfNewPassword = JSON.stringify(newValue)
      if (newValue.length > 0 && this.newPassword.length <= newValue.length) {
        if (newPassword == cfNewPassword) {
          this.errorCfNewPassword = false
        } else {
          this.errorCfNewPassword = true
        }
      } else {
        this.errorCfNewPassword = false
      }
      this.DisableBtn()
    }
  },
  computed: {},
  methods: {
    edit (item, index) {
      this.editRow = index
    },
    renderText (row) {
      if (row.user_status == 'web_portal') {
        return 'Username :'
      } else if (row.user_status == 'LDAP') {
        return 'LDAP'
      } else if (row.user_status == 'only') {
        return 'เข้าใช้งานผ่านระบบตัวเองเท่านั้น'
      }
    },
    sort (feild) {
      if (feild == 'no') {
        this.sortNo = !this.sortNo
      } else if (feild == 'name') {
        this.sortAppName = !this.sortAppName
      } else if (feild == 'user') {
        this.sortUser = !this.sortUser
      }
    },
    SettingApp () {
      // this.setAppDialog = true
    },
    CloseSetAppDialogs () {
      this.setAppDialog = false
    },
    SetLanguages (value) {
      this.language = value
    },
    DisableBtn () {
      let newPassword = JSON.stringify(this.newPassword)
      let cfNewPassword = JSON.stringify(this.cfNewPassword)
      if (this.newPassword.length >= 6 && newPassword == cfNewPassword) {
        this.disPwdBtn = false
      } else {
        this.disPwdBtn = true
      }
    },
    IsNumber (evt) {
      evt = evt ? evt : window.event
      var keyCode = evt.which ? evt.which : evt.keyCode
      if (
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 97 && keyCode <= 122) ||
        (keyCode >= 65 && keyCode <= 91)
      ) {
        return true
      } else {
        evt.preventDefault()
      }
    },
    InCondition (evt) {
      let newPassword = JSON.stringify(this.newPassword)
      if (this.newPassword.length >= 6) {
        let condChar = /[a-zA-Z]/g
        let condNum = /[0-9]/g
        let rsChar = newPassword.search(condChar)
        let rsNum = newPassword.search(condNum)
        if (rsChar >= 0 && rsNum >= 0) {
          this.errorNewPassword = false
          if (this.cfNewPassword.length >= 6) {
            this.disPwdBtn = false
          }
        } else {
          this.errorNewPassword = true
          if (this.cfNewPassword.length >= 6) {
            this.disPwdBtn = true
          }
        }
      }
    },
    ConfirmDialogs () {
      if (this.stepChangePwd == 0) {
        // this.errorPwd = false
        this.disPwdBtn = true
        this.stepChangePwd = 1
      } else if (this.stepChangePwd == 1) {
        this.stepChangePwd = 2
      }
      console.log('ConfirmDialogs =>')
    },
    ClosePwdDialogs () {
      this.pwdDialog = false
      this.password = ''
      this.errorPwd = false
      this.error = false
      this.disPwdBtn = true
      this.stepChangePwd = 0
      this.newPassword = ''
      this.errorNewPassword = false
      this.cfNewPassword = ''
      this.errorCfNewPassword = false
    },
    ChangePassword () {
      this.pwdDialog = true
    },
    renderProfileDesc () {
      if (this.stepChangePic == 0 || this.stepChangePic == 1) {
        return 'รูปโปรไฟล์'
      } else if (this.stepChangePic == 2) {
        return 'อัปโหลดรูปโปรไฟล์'
      } else if (this.stepChangePic == 3) {
        return 'กำลังลบรูปภาพ...'
      } else if (this.stepChangePic == 4) {
        return 'ลบรูปโปรไฟล์สำเร็จ'
      } else {
      }
    },
    renderBtnLeft () {
      if (this.stepChangePic == 0 || this.stepChangePic == 1) {
        return 'ลบ'
      } else if (this.stepChangePic == 2) {
        return 'ยกเลิก'
      } else if (this.stepChangePic == 3) {
        // return 'กำลังลบรูปภาพ...'
      } else if (this.stepChangePic == 4) {
        return 'ปิด'
      } else {
      }
    },
    onButtonClick () {
      this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false
        },
        { once: true }
      )

      this.$refs.uploader.click()
    },
    onFileChanged (e) {
      this.selectedFile = e.target.files[0]
      setTimeout(() => {
        console.log(e.target.files[0].name)
      }, 2000)

      // do something
    },
    ChangePic () {
      this.showEditPic = true
      if (this.stepChangePic == 0) {
        //CHANHE
        this.stepChangePic = 1
      } else if (this.stepChangePic == 1) {
        //CHANHE 2
        this.stepChangePic = 2
      } else if (this.stepChangePic == 2) {
        //UPLOAD PIC
        this.stepChangePic = 3
      }
      console.log('ChangePic', this.stepChangePic)
    },
    DeletePic () {
      console.log('DeletePic', this.stepChangePic)
      if (this.stepChangePic == 1) {
        this.showDefaultAccount = true
        this.stepChangePic = 3
        setTimeout(() => {
          this.stepChangePic = 4
        }, 1000)
      } else if (this.stepChangePic == 2) {
      } else if (this.stepChangePic == 3) {
      } else if (this.stepChangePic == 4) {
        this.CloseDialogs()
      }
    },
    LoginOut () {
      this.$router.push('/')
    },
    UploadPic () {
      this.picDialog = true
    },
    CloseDialogs () {
      this.picDialog = false
      this.showEditPic = false
      this.stepChangePic = 0
    }
  }
}
</script>
<style></style>
