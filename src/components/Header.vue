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
              <span style="margin-left:12px;font-weight:400">
                {{ language }}
              </span>
              <img
                src="@/assets/icons/arrow_drop_down.svg"
                alt="open"
                style="margin-left:19px;"
              />
            </div>
          </template>
          <v-list>
            เปลี่ยนภาษา
            <!-- <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              style="display:flex;padding-left:38px"
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
                <div class="account-name" style="padding-top:3px">
                  {{ position }}
                </div>
              </div>
              <img
                src="@/assets/icons/arrow_drop_down.svg"
                alt="open"
                style="padding-left: 19px;
                      width: 48px;
                      padding-top: 10px;
                      height: 40px;"
              />
            </div>
          </template>
          <v-list id="account-menu-body">
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
            <div style="text-align:center;padding-bottom:20px">
              <v-chip class="account-chip">
                {{ status_account }}
              </v-chip>
            </div>
            <div class="line-page"></div>
            <div class="account-button">
              <v-btn
                class="ok-btn"
                style="margin-right:35px"
                v-show="permissinoAccount"
                @click="ChangePassword()"
              >
                {{ okBtn }}
              </v-btn>
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
        <v-card-text style="padding:unset">
          <div
            style="color:#797979;
                      font-size:24px;
                      font-family:kanit;
                      text-align:center"
          >
            {{ 'กรุณายืนยันตัวตน' }}
          </div>
          <div
            style="color:##414141;
                      font-size:18px;
                      font-family:kanit;
                      padding-top:90px;
                      display:flex"
          >
            <div style="padding-top:8px">{{ 'รหัสผ่านปัจจุบัน' }}</div>
            <div class="input-with-icon" :class="{ active: error }">
              <input
                type="password"
                v-model="password"
                :placeholder="'โปรดระบุ'"
              />
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center" style="padding-top:80px">
          <v-btn
            text
            @click="ClosePwdDialogs()"
            class="ok-btn"
            :style="{ 'margin-right': '35px' }"
          >
            {{ 'ยกเลิก' }}
          </v-btn>

          <v-btn
            text
            @click="confirmDialogs()"
            class="cancel-btn"
            :disabled="disPwdBtn"
          >
            {{ 'ยืนยัน' }}
          </v-btn>
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
      password: null,
      error: false,
      disPwdBtn: true
    }
  },
  watch: {
    password (newValue) {
      if (newValue.length > 6) {
        this.disPwdBtn = false
      } else {
        this.disPwdBtn = true
      }
    }
  },
  computed: {},
  methods: {
    confirmDialogs () {
      console.log('confirmDialogs =>')
    },
    ClosePwdDialogs () {
      this.pwdDialog = false
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
      this.$router.push('/login')
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
