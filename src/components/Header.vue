<template>
  <div class="header-main" v-resize="onResize">
    <div style="width:50%;display:flex;cursor:pointer" @click="goHome">
      <img src="@/assets/icons/logo.png" :style="{ height: logo }" />
      <div class="sys-name" :style="{ 'font-size': sysName }">
        DHAS PORTAL
      </div>
    </div>
    <div style="width:50%" class="right-header justify-end">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <v-icon
              v-show="resizeHeader"
              v-text="'mdi-web'"
              style="color:#ffffff;"
              size="41"
            ></v-icon>
            <span
              :style="{
                'margin-left': resizeHeader ? '15px' : '0px',
                'font-weight': 400,
                'text-transform': 'uppercase'
              }"
            >
              {{ language }}
            </span>
            <v-icon
              v-text="'mdi-menu-down'"
              :style="{
                'padding-left': resizeHeader ? '18px' : '0px',
                color: '#ffffff'
              }"
              size="20"
            ></v-icon>
          </div>
        </template>
        <v-list id="change-languages-body">
          <div class="first">
            <div class="text" @click="SetLanguages('th')">
              ภาษาไทย (TH)
            </div>
            <v-icon
              v-show="language == 'th'"
              v-text="'mdi-check'"
              style="color:#CE1212;"
              size="20"
            ></v-icon>
          </div>
          <div class="second">
            <div class="text" @click="SetLanguages('en')">
              ภาษาอังกฤษ (EN)
            </div>
            <v-icon
              v-show="language == 'en'"
              v-text="'mdi-check'"
              style="color:#CE1212;"
              size="20"
            ></v-icon>
          </div>
        </v-list>
      </v-menu>
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <div
            v-bind="attrs"
            v-on="on"
            :style="{
              display: 'flex',
              'padding-left': resizeHeader ? '2%' : '5%'
            }"
          >
            <div>
              <v-avatar size="50" v-show="showDefaultAccount">
                <div class="deafult-name">{{ accountNameEng }}</div>
              </v-avatar>
              <v-avatar v-show="!showDefaultAccount" size="37">
                <v-img src="@/assets/images/account_demo.png"></v-img>
              </v-avatar>
            </div>
            <div :style="{ 'margin-left': '14px' }" v-show="resizeHeader">
              <div class="account-name">{{ info.name_th }}</div>
              <div class="account-name" style="padding-top:1px">
                {{ info.postname_th }}
              </div>
            </div>
            <v-icon
              v-text="'mdi-menu-down'"
              :style="{
                'padding-left': resizeHeader ? '18px' : '5px',
                color: '#ffffff'
              }"
              size="20"
            ></v-icon>
          </div>
        </template>
        <v-list
          id="account-menu-body"
          :style="{ height: permissinoAccount ? '385px' : '340px' }"
        >
          <div class="logo-line" @click="UploadPic()">
            <v-badge avatar bordered overlap bottom offset-x="24" offset-y="24">
              <template v-slot:badge>
                <v-avatar style="background:white;border: 1px solid #D1D1D1;">
                  <v-icon
                    v-text="'mdi-camera'"
                    style="color:#000000;"
                    size="12"
                  ></v-icon>
                </v-avatar>
              </template>

              <v-avatar v-show="!showDefaultAccount" size="100">
                <v-img src="@/assets/images/account_demo.png"></v-img>
              </v-avatar>
              <div v-show="showDefaultAccount" class="deafult-name">
                {{ accountNameEng }}
              </div>
            </v-badge>
          </div>
          <div class="account">
            <div class="account-name">
              {{ info.name_th }}
            </div>
            <div class="position-name">
              {{ info.postname_th }}
            </div>
          </div>
          <div class="line-page" style="margin-top:10px"></div>
          <div class="menu-line">
            <div class="menu-rows" @click="openProfile">
              <v-icon
                v-text="'mdi-account-circle'"
                style="color:#CE1212;"
                size="21"
              ></v-icon>
              <span style="margin-left:8px"> {{ 'ข้อมูลส่วนตัว' }}</span>
            </div>
            <!-- 
            <div @click="SettingApp()" class="menu-rows">
              <v-icon
                v-text="'mdi-cog-box'"
                style="color:#CE1212;"
                size="23"
              ></v-icon>
              <span style="margin-left:8px">{{
                'จัดการรายการแอปพลิเคชัน'
              }}</span>
            </div>
            <div
              @click="ChangePassword()"
              v-show="permissinoAccount"
              class="menu-rows"
            >
              <v-icon
                v-text="'mdi-account-convert'"
                style="color:#CE1212;"
                size="20"
              ></v-icon>
              <span style="margin-left:8px"> {{ 'เปลี่ยนรหัสผ่าน' }}</span>
            </div> -->
            <div @click="signOut()" class="menu-rows" style="padding-left:2px">
              <v-icon
                v-text="'mdi-export'"
                style="color:#CE1212;"
                size="20"
              ></v-icon>
              <span style="margin-left:8px">{{ $t('btn_signout') }}</span>
            </div>
          </div>
        </v-list>
      </v-menu>
    </div>

    <!---Dialogs-->
    <v-dialog v-model="picDialog" width="600" :no-click-animation="false">
      <v-card id="change-pic-dialogs">
        <v-card-text style="padding:unset">
          <div class="justify-end" style="display: flex;">
            <v-icon
              @click="CloseDialogs()"
              v-text="'mdi-close'"
              style="color:#000000;"
              size="20"
            ></v-icon>
          </div>
          <div class="center-vh" style="padding-top:20px">
            <v-avatar v-show="!showDefaultAccount" size="230">
              <v-img src="@/assets/images/account_demo.png"> </v-img>
              <!-- <img :src="`${profilePicPath}`"/> -->
              <!-- <img src="@/assets/images/account_demo.png"/> -->
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
            <v-icon
              v-show="stepChangePic == 1"
              v-text="'mdi-delete'"
              style="color:#CE1212;margin-right:5px;"
              size="20"
            ></v-icon>
            {{ renderBtnLeft() }}
          </v-btn>

          <v-btn
            text
            @click="ChangePic()"
            class="cancel-btn"
            v-show="stepChangePic < 2"
          >
            <v-icon
              v-text="'mdi-pencil'"
              style="color:#ffffff;margin-right:8px;"
              size="18"
            ></v-icon>
            {{ $t('btn_change') }}
          </v-btn>

          <div v-show="stepChangePic == 2 && stepChangePic != 3">
            <v-btn class="cancel-btn" @click="onButtonClick">
              <!-- :loading="isSelecting" -->
              {{ $t('btn_upload') }}
            </v-btn>
            <input ref="uploader" class="d-none" type="file" accept="image/*" />
            <!-- @change="onFileChanged" -->
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="pwdDialog" width="650" :no-click-animation="false">
      <v-card id="pwd-dialogs">
        <v-card-text v-if="stepChangePwd == 0" style="padding:unset">
          <div class="head-menu7 justify-center" style="display:flex">
            {{ 'กรุณายืนยันตัวตน' }}
          </div>
          <div style="padding-top:90px;display:flex">
            <div class="head-menu3 center-vh" style="margin-right: 45px;">
              {{ 'รหัสผ่านปัจจุบัน' }}
            </div>
            <div class="input-with-icon" :class="{ active: errorPwd }">
              <input
                type="password"
                v-model="password"
                @keypress="IsNumber"
                :placeholder="$t('input_selected')"
              />
            </div>
          </div>
          <div
            v-show="errorPwd"
            class="error-input"
            style="padding-left:137px;padding-top:8px"
          >
            รหัสผ่านไม่ถูกต้อง
          </div>
        </v-card-text>
        <v-card-text v-else style="padding:unset">
          <div v-show="stepChangePwd < 2">
            <div style="display:flex">
              <div class="head-menu3 center-vh" style="padding-top:8px">
                {{ 'รหัสผ่านใหม่' }}
              </div>
              <div
                class="input-with-icon"
                style="margin-left:72px"
                :class="{ active: errorNewPassword }"
              >
                <input
                  type="password"
                  v-model="newPassword"
                  :placeholder="$t('input_selected')"
                  @keypress="IsNumber"
                  @keyup="InCondition"
                />
              </div>
            </div>
          </div>
          <div v-show="stepChangePwd < 2">
            <div style="padding-top:30px;display:flex">
              <div class="head-menu3 center-vh" style="padding-top:8px">
                {{ 'ยืนยันรหัสผ่าน' }}
              </div>
              <div
                class="input-with-icon"
                style="margin-left:62px"
                :class="{ active: errorCfNewPassword }"
              >
                <input
                  type="password"
                  v-model="cfNewPassword"
                  @keypress="IsNumber"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
          </div>
          <div
            v-show="stepChangePwd < 2"
            class="details"
            style="padding-top:30px"
          >
            หมายเหตุ - รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษรและประกอบไปด้วย<br />
            1) ตัวเลข 0 - 9 <br />
            2) ตัวอักษรภาษาอังกฤษตัวพิมพ์เล็กหรือพิมพ์ใหญ่
          </div>
          <div v-show="stepChangePwd == 2">
            <div class="center-vh">
              <v-avatar style="background:#66BB6A;width:90px;height:90px">
                <v-icon style="color:white">
                  mdi-check
                </v-icon>
              </v-avatar>
            </div>
            <div class="head-menu7" style="margin-top:50px; text-align:center">
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
            {{ stepChangePwd == 2 ? $t('btn_close') : $t('btn_cancel') }}
          </v-btn>

          <v-btn
            v-show="stepChangePwd < 2"
            @click="ConfirmDialogs()"
            :class="disPwdBtn ? 'cancel-btn-disabled' : 'cancel-btn'"
          >
            {{ stepChangePwd == 0 ? $t('btn_confirm') : $t('btn_change_pwd') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="setAppDialog" width="800" :no-click-animation="false">
      <v-card>
        <div class="justify-end" style="display: flex">
          <v-icon
            @click="CloseSetAppDialogs()"
            v-text="'mdi-close'"
            style="color:#000000;"
            size="20"
          ></v-icon>
        </div>
        <div>
          <div class="head-menu5">
            {{ 'รายการแอปพลิเคชันของคุณ' }}
          </div>
          <div class="line-page" style="margin-top:8px"></div>
          <div style="width:100%;margin-top:15px">
            <div class="input-with-icon search-form">
              <v-icon v-text="'mdi-magnify'" size="20"></v-icon>
              <input
                type="text"
                v-model="searchApp"
                :placeholder="$t('input_search')"
              />
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
                <div class="head" style="width:30%" @click="sort('name')">
                  <div class="column-name">แอปพิเคชั่น</div>
                  <v-icon
                    v-text="sortAppName ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head" style="width:60%" @click="sort('user')">
                  <div class="column-name">
                    ชื่อผู้ใช้งานในการเข้าสู่ระบบด้วย SSO
                  </div>
                  <v-icon
                    v-text="sortUser ? 'mdi-menu-up' : 'mdi-menu-down'"
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
                  <div
                    class="body"
                    style="width:10%;padding-left:5px;padding-top:5px"
                  >
                    {{ index + 1 }}
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
                      style="display: flex;width: 200px;height: 30px;margin-right:10px"
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
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="profileDialog"
      :width="profileView ? 500 : 1000"
      :no-click-animation="false"
    >
      <v-card id="profile-dialogs">
        <v-card-text v-if="profileView" style="padding:unset">
          <div class="center-vh" style="margin-top:45px">
            <v-avatar style="background:#66BB6A;width:90px;height:90px">
              <v-icon style="color:white" size="30">
                mdi-check
              </v-icon>
            </v-avatar>
          </div>
          <div class="head-menu5" style="margin-top:35px; text-align:center">
            {{ 'เปลี่ยนแปลงข้อมูลส่วนตัวสำเร็จ' }}
          </div>
        </v-card-text>
        <v-card-text v-else style="padding:unset">
          <div class="justify-end" style="display: flex;">
            <v-icon
              @click="CloseProfileDialog()"
              v-text="'mdi-close'"
              style="color:#000000;"
              size="20"
            ></v-icon>
          </div>
          <div>
            <div class="head-menu5">
              {{ 'ข้อมูลส่วนตัว' }}
            </div>
            <div class="line-page" style="margin-top:8px;"></div>
          </div>
          <div class="rows" style="margin-top:18px">
            <div style="width:20%" class="rows-name">
              ประเภทการเข้าใช้งานระบบ
            </div>
            <div
              :style="{ width: '80%', 'padding-left': '8px', color: '#414141' }"
              class="rows-name"
            >
              {{
                profile.type_login == 1 ? 'LDAP (AD)' : 'ผู้ใช้งานบนแอปพลิเคชัน'
              }}
            </div>
          </div>
          <div class="rows">
            <div style="width:20%" class="rows-name">รหัสพนักงาน</div>
            <div style="width:80%" class="rows-input">
              <div
                class="input-with-icon"
                :style="{ 'box-shadow': 'unset', width: ' 250px' }"
              >
                <input
                  type="text"
                  v-model="profile.emp_code"
                  :placeholder="$t('input_selected')"
                  :readonly="true"
                />
              </div>
            </div>
          </div>
          <div class="rows">
            <div style="width:50%;display: flex;">
              <div style="width:40%" class="rows-name">ชื่อ - นามสกุล (TH)</div>
              <div style="width:60%" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    v-model="profile.name_th"
                    :placeholder="$t('input_selected')"
                    :readonly="enableInput"
                    @keyup="enableBtnSave"
                    @keypress="enableBtnSave"
                  />
                </div>
              </div>
            </div>
            <div style="width:50%;;display: flex;">
              <div style="width:40%" class="rows-name">
                ชื่อ - นามสกุล (EN)
              </div>
              <div style="width:60%;padding-right:25px" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    v-model="profile.name_en"
                    :placeholder="$t('input_selected')"
                    :readonly="enableInput"
                    @keyup="enableBtnSave"
                    @keypress="enableBtnSave"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="rows">
            <div style="width:50%;display: flex;">
              <div style="width:40%" class="rows-name">ชื่อเล่น (TH)</div>
              <div style="width:60%" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    v-model="profile.nickname1_th"
                    :placeholder="enableInput ? '-' : '-- หากมีโปรดระบุ --'"
                    :readonly="enableInput"
                  />
                </div>
              </div>
            </div>
            <div style="width:50%;;display: flex;">
              <div style="width:40%" class="rows-name">
                ชื่อเล่น (EN)
              </div>
              <div style="width:60%;padding-right:25px" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    v-model="profile.nickname1_en"
                    :placeholder="enableInput ? '-' : '-- หากมีโปรดระบุ --'"
                    :readonly="enableInput"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="rows">
            <div style="width:50%;display: flex;">
              <div style="width:40%" class="rows-name">ฉายา (TH)</div>
              <div style="width:60%" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    v-model="profile.nickname2_th"
                    :placeholder="enableInput ? '-' : '-- หากมีโปรดระบุ --'"
                    :readonly="enableInput"
                  />
                </div>
              </div>
            </div>
            <div style="width:50%;;display: flex;">
              <div style="width:40%" class="rows-name">
                ฉายา (EN)
              </div>
              <div style="width:60%;padding-right:25px" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    v-model="profile.nickname2_en"
                    :placeholder="enableInput ? '-' : '-- หากมีโปรดระบุ --'"
                    :readonly="enableInput"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="rows">
            <div style="width:50%;display: flex;">
              <div style="width:40%" class="rows-name">ตำแหน่งงาน (TH)</div>
              <div style="width:60%" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    v-model="profile.postname_th"
                    :placeholder="$t('input_selected')"
                    :readonly="enableInput"
                    @keyup="enableBtnSave"
                    @keypress="enableBtnSave"
                  />
                </div>
              </div>
            </div>
            <div style="width:50%;;display: flex;">
              <div style="width:40%" class="rows-name">
                ตำแหน่งงาน (EN)
              </div>
              <div style="width:60%;padding-right:25px" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    @keyup="enableBtnSave"
                    @keypress="enableBtnSave"
                    v-model="profile.postname_en"
                    :placeholder="$t('input_selected')"
                    :readonly="enableInput"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="rows">
            <div style="width:50%;display: flex;">
              <div style="width:40%" class="rows-name">อีเมล</div>
              <div style="width:60%" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{ 'box-shadow': 'unset', width: ' 250px' }"
                >
                  <input
                    type="text"
                    v-model="profile.email"
                    :placeholder="$t('input_selected')"
                    :readonly="true"
                  />
                </div>
              </div>
            </div>
            <div style="width:50%;;display: flex;">
              <div style="width:40%" class="rows-name">
                3CX
              </div>
              <div style="width:60%;padding-right:25px" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    v-model="profile.cx"
                    :placeholder="enableInput ? '-' : '-- หากมีโปรดระบุ --'"
                    :readonly="enableInput"
                    @keypress="isNumber"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="rows" style="padding-bottom:3px">
            <div style="width:50%;display: flex;">
              <div style="width:40%;height:28px" class="rows-name">
                เบอร์โทร
              </div>
              <div style="width:60%" class="rows-input">
                <div
                  class="input-with-icon"
                  :style="{
                    'box-shadow': enableInput ? 'unset' : colInput,
                    width: ' 250px'
                  }"
                >
                  <input
                    type="text"
                    v-model="profile.phone"
                    :placeholder="enableInput ? '-' : '-- หากมีโปรดระบุ --'"
                    :readonly="enableInput"
                    @keypress="isNumber"
                  />
                </div>
                <div style="color:#CE1212;font-size:8px;padding-top:5px">
                  * หากระบุข้อมูลดังกล่าวจะเป็นสาธารณะ
                </div>
              </div>
            </div>
            <div style="width:50%;;display: flex;"></div>
          </div>
        </v-card-text>
        <v-card-actions
          v-if="profileView"
          class="justify-center"
          style="margin-top:40px;margin-bottom:20px"
        >
          <v-btn
            text
            @click="CloseProfileDialog()"
            class="ok-btn"
            style="width:200px"
          >
            {{ $t('btn_close') }}
          </v-btn>
        </v-card-actions>
        <v-card-actions
          v-else
          class="justify-center"
          style="margin-top:35px;margin-bottom:20px"
        >
          <v-btn
            v-show="enableInput"
            text
            @click="editProfile()"
            class="cancel-btn"
            style="width:200px"
          >
            <v-icon
              v-text="'mdi-pencil'"
              style="color:#ffffff;margin-right:8px;"
              size="18"
            ></v-icon>
            {{ 'แก้ไขข้อมูล' }}
          </v-btn>
          <v-btn
            v-show="!enableInput"
            text
            @click="closeProfile()"
            class="ok-btn"
            style="width:200px"
          >
            {{ $t('btn_cancel') }}
          </v-btn>
          <v-btn
            v-show="!enableInput"
            text
            @click="profileViewfile()"
            class="cancel-btn"
            :style="{
              width: '200px',
              background: enableBtn ? '#CE1212' : '',
              opacity: enableBtn ? '0.51' : ''
            }"
            :disabled="enableBtn"
          >
            {{ $t('btn_save_close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize'
export default {
  name: 'headers',
  props: {},
  data () {
    return {
      profilePicPath: '@/assets/images/account_demo.png',
      language: 'th',
      // accountName: 'กิตติชัย กำแพงทอง',
      accountNameEng: 'K',
      okBtn: 'เปลี่ยนรหัสผ่าน',
      status_account: 'ผู้ดูแลระบบ',
      stepChangePic: 0,
      showDefaultAccount: false,
      permissinoAccount: true,
      picDialog: false,
      showEditPic: false,
      selectedFile: null,
      // isSelecting: false,
      pwdDialog: false,
      password: '',
      errorPwd: true,
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
      editRow: -1,
      tranformScale: 'scale(1)',
      sysName: '20px',
      logo: '45px',
      resizeHeader: true,
      profileDialog: false,
      enableInput: true,
      profile: {},
      colInput: '0px 0px 3px #00000080',
      profileView: false,
      enableBtn: false
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
  computed: {
    info () {
      return this.$store.getters.user
    }
  },
  methods: {
    profileViewfile () {
      console.log(this.profile)
      this.profileView = true
      // this.enableInput = false
    },
    editProfile () {
      this.enableInput = false
    },
    closeProfile () {
      this.profile = JSON.parse(JSON.stringify(this.info))
      this.enableInput = true
    },
    enableBtnSave () {
      let item = this.profile
      let name_th = item.name_th.trim()
      let name_en = item.name_en.trim()
      let postname_th = item.postname_th.trim()
      let postname_en = item.postname_en.trim()
      if (
        name_th.length > 0 &&
        name_en.length > 0 &&
        postname_th.length > 0 &&
        postname_en.length > 0
      ) {
        this.enableBtn = false
      } else {
        this.enableBtn = true
      }
    },
    openProfile () {
      this.profileDialog = true
      this.profileView = false
      this.profile = JSON.parse(JSON.stringify(this.info))
    },
    CloseProfileDialog () {
      this.profileDialog = false
      this.profile = {}
      this.profileView = false
    },
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      if (x <= 375) {
        this.sysName = '15px'
      } else if (x > 375 && x <= 568) {
        this.sysName = '18px'
      } else {
        this.sysName = '20px'
      }
      if (x <= 690) {
        this.resizeHeader = false
      } else {
        this.resizeHeader = true
      }
    },
    goHome () {
      if (this.$router.app._route.path !== '/home') {
        this.$router.push('/home')
      }
    },
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
      this.setAppDialog = true
    },
    CloseSetAppDialogs () {
      this.setAppDialog = false
    },
    SetLanguages (value) {
      this.$i18n.locale = value
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
      this.$refs.uploader.click()
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
    signOut () {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    },
    UploadPic () {
      /*
      this.picDialog = true
      */
    },
    CloseDialogs () {
      this.picDialog = false
      this.showEditPic = false
      this.stepChangePic = 0
    },
    isNumber (evt) {
      this.enableBtnSave()
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57 || charCode == 46)) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  },
  created () {
    if (
      this.$store.getters.user === null &&
      sessionStorage.getItem('info') === null
    ) {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    } else if (sessionStorage.getItem('info') !== null) {
      // console.log(JSON.parse(sessionStorage.getItem('info')))
      this.$store.commit('SetUser', JSON.parse(sessionStorage.getItem('info')))
    }
  },
  components: {
    ImageUploader
  }
}
</script>
<style></style>
