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
              {{ $t('lang.list_1') }}
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
              {{ $t('lang.list_2') }}
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
                <v-img
                  :src="info.image"
                  style="border: 2px solid #ffff;"
                ></v-img>
              </v-avatar>
            </div>
            <div :style="{ 'margin-left': '14px' }" v-show="resizeHeader">
              <div class="account-name">{{ info['name_' + $i18n.locale] }}</div>
              <div class="account-name" style="padding-top:1px">
                {{ info['postname_' + $i18n.locale] }}
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
        <v-list id="account-menu-body">
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
                <v-img :src="info.image"></v-img>
              </v-avatar>
              <div v-show="showDefaultAccount" class="deafult-name">
                {{ accountNameEng }}
              </div>
            </v-badge>
          </div>
          <div class="account">
            <div class="account-name">
              {{ info['name_' + $i18n.locale] }}
            </div>
            <div class="position-name">
              {{ info['postname_' + $i18n.locale] }}
            </div>
          </div>
          <div class="line-page" style="margin-top:10px"></div>
          <div class="menu-line" style="margin-bottom:10px">
            <div class="menu-rows" @click="openProfile">
              <img src="@/assets/icons/people.png" class="eye eye-hided" />
              <span style="margin-left:8px"> {{ $t('profile.menu_1') }}</span>
            </div>
            <div @click="SettingApp()" class="menu-rows">
              <img src="@/assets/icons/settingapp.png" class="eye eye-hided" />
              <span style="margin-left:8px">{{ $t('profile.menu_2') }}</span>
            </div>
            <div
              @click="ChangePassword()"
              v-show="info.type_login == 0"
              class="menu-rows"
            >
              <img src="@/assets/icons/password.png" class="eye eye-hided" />
              <span style="margin-left:8px"> {{ $t('profile.menu_3') }}</span>
            </div>
            <div @click="signOut()" class="menu-rows" style="padding-left:2px">
              <img src="@/assets/icons/Logout.png" class="eye eye-hided" />
              <span style="margin-left:8px">{{ $t('profile.menu_4') }}</span>
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
          <div class="center-vh">
            <v-avatar v-show="!showDefaultAccount" size="230">
              <div
                v-show="file !== ''"
                class="upload-block"
                id="image-uploader-profile"
              >
                <!-- :id="'idUploader2'" -->
                <image-uploader
                  v-model="file"
                  :preview="true"
                  :maxHeight="768"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  capture="environment"
                  :debug="1"
                  accept="image/jpeg,.png"
                  :autoRotate="true"
                  outputFormat="blob"
                  @input="setImage"
                >
                  <label
                    for="fileInput"
                    slot="upload-label"
                    ref="uploader2"
                    style="visibility: hidden;"
                  >
                    {{ hasImage ? 'Replace' : 'Click to upload' }}
                  </label>
                </image-uploader>
              </div>
              <v-img
                v-if="file == '' && info.image !== ''"
                :src="info.image"
                id="image-uploader-show-profile"
              >
              </v-img>
            </v-avatar>
            <div v-show="showDefaultAccount" class="deafult-name">
              {{ accountNameEng }}
            </div>
          </div>
          <div class="profile-desc">
            {{ renderProfileDesc() }}
          </div>
          <div
            v-if="stepChangePic == 4"
            style="color:#CE1212;font-size:8px;padding-top:5px;text-align:center"
          >
            <!-- {{ '* หากระบุข้อมูลดังกล่าวจะเป็นสาธารณะ' }} -->
          </div>
          <div
            v-if="stepChangePic == 0"
            style="margin-top:70px;margin-bottom:30px;display:flex"
            class="justify-center"
          >
            <v-btn text @click="ChangePic()" class="cancel-btn">
              <v-icon
                v-text="'mdi-pencil'"
                style="color:#ffffff;margin-right:8px;"
                size="18"
              ></v-icon>
              {{ $t('btn_change') }}
            </v-btn>
          </div>
          <div
            v-if="stepChangePic == 1"
            style="margin-top:70px;margin-bottom:30px;display:flex"
            class="justify-center"
          >
            <v-btn
              text
              @click="stepChangePic = 2"
              class="ok-btn"
              :style="{ 'margin-right': '35px' }"
            >
              <v-icon
                v-text="'mdi-delete'"
                style="color:#CE1212;margin-right:5px;"
                size="20"
              ></v-icon>
              {{ $t('btn_delete') }}
            </v-btn>
            <v-btn text @click="stepChangePic = 4" class="cancel-btn">
              <v-icon
                v-text="'mdi-pencil'"
                style="color:#ffffff;margin-right:8px;"
                size="18"
              ></v-icon>
              {{ $t('btn_change') }}
            </v-btn>
          </div>
          <div
            v-else-if="stepChangePic == 2"
            style="margin-top:70px;margin-bottom:30px;display:flex"
            class="justify-center"
          >
            <v-btn
              text
              @click="stepChangePic = 0"
              class="ok-btn"
              :style="{ 'margin-right': '35px' }"
            >
              {{ $t('btn_cancel') }}
            </v-btn>
            <v-btn text @click="DeletePic()" class="cancel-btn">
              {{ $t('btn_delete') }}
            </v-btn>
          </div>
          <div
            v-else-if="stepChangePic == 3 || stepChangePic == 5"
            style="margin-top:70px;margin-bottom:30px;display:flex"
            class="justify-center"
          >
            <v-btn text @click="CloseDialogs()" class="ok-btn">
              {{ $t('btn_close') }}
            </v-btn>
          </div>
          <div
            v-else-if="stepChangePic == 4"
            style="margin-top:70px;margin-bottom:30px;display:flex"
            class="justify-center"
          >
            <v-btn
              text
              @click="stepChangePic = 0"
              class="ok-btn"
              :style="{ 'margin-right': '35px' }"
            >
              {{ $t('btn_cancel') }}
            </v-btn>
            <v-btn class="cancel-btn" @click="onButtonClick">
              {{ $t('btn_upload') }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="pwdDialog" width="650" :no-click-animation="false">
      <v-card id="pwd-dialogs">
        <v-card-text v-if="stepChangePwd == 0" style="padding:unset">
          <div class="head-menu7  center-vh" style="display:flex;">
            {{ $t('pwd.text1') }}
          </div>
          <div style="margin-top:90px">
            <div style="display:flex;width:100%;padding-right:30px">
              <div class="head-menu3 center-vh" style="width:30%">
                {{ $t('pwd.text2') }}
              </div>
              <div
                class="input-with-icon"
                style="width:70%;display:flex"
                :class="{ active: errorPwd }"
              >
                <input
                  style="width:100%"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  @keypress="IsNumber"
                  :placeholder="$t('input_selected')"
                />
                <div
                  @click="showPassword = !showPassword"
                  style="padding-top: 5px;cursor:pointer"
                >
                  <v-icon
                    v-text="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    style="color:#000000;opacity:0.5;padding-right:8px;"
                    size="20"
                  ></v-icon>
                </div>
              </div>
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
          <div v-show="stepChangePwd == 1">
            <div style="display:flex;width:100%">
              <div class="head-menu3" style="padding-top:4px;width:40%">
                {{ $t('pwd.text3') }}
              </div>
              <div
                class="input-with-icon"
                style="width:60%;display:flex"
                :class="{ active: errorNewPassword }"
              >
                <input
                  style="width:100%"
                  :type="showNewPassword ? 'text' : 'password'"
                  v-model="newPassword"
                  :placeholder="$t('input_selected')"
                  @keypress="IsNumber"
                  @keyup="InCondition1"
                />
                <div
                  @click="showNewPassword = !showNewPassword"
                  style="padding-top: 5px;cursor:pointer"
                >
                  <v-icon
                    v-text="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    style="color:#000000;opacity:0.5;padding-right:8px;"
                    size="20"
                  ></v-icon>
                </div>
              </div>
            </div>
          </div>
          <div v-show="stepChangePwd == 1">
            <div style="padding-top:30px;display:flex;width:100%">
              <div class="head-menu3" style="padding-top:6px;width:40%">
                {{ $t('pwd.text4') }}
              </div>
              <div
                class="input-with-icon"
                style="width:60%;display:flex"
                :class="{ active: errorCfNewPassword }"
              >
                <input
                  style="width:100%"
                  :type="showCfNewPassword ? 'text' : 'password'"
                  v-model="cfNewPassword"
                  @keypress="IsNumber"
                  @keyup="InCondition2"
                  :placeholder="$t('input_selected')"
                />
                <div
                  @click="showCfNewPassword = !showCfNewPassword"
                  style="padding-top: 5px;cursor:pointer"
                >
                  <v-icon
                    v-text="showCfNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    style="color:#000000;opacity:0.5;padding-right:8px;"
                    size="20"
                  ></v-icon>
                </div>
              </div>
            </div>
          </div>
          <div
            v-show="stepChangePwd == 1"
            class="details"
            style="padding-top:30px"
          >
            {{ $t('pwd.text9') }}<br />
            {{ $t('pwd.text7') }} <br />
            {{ $t('pwd.text8') }} <br />
            {{ $t('pwd.text10') }}
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
              {{ $t('pwd.text5') }}
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
            :disabled="disPwdBtn"
            v-show="stepChangePwd < 2"
            @click="ConfirmDialogs()"
            class="cancel-btn"
            :style="{
              background: disPwdBtn ? '#CE1212' : '',
              opacity: disPwdBtn ? '0.51' : ''
            }"
          >
            {{ stepChangePwd == 0 ? $t('btn_confirm') : $t('btn_change_pwd') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="setAppDialog"
      :width="viewListApp ? 800 : 600"
      :no-click-animation="false"
    >
      <v-card v-if="viewListApp">
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
            {{ $t('manageapp.title') }}
          </div>
          <div class="line-page" style="margin-top:8px"></div>
          <div style="width:100%;margin-top:15px">
            <div class="input-with-icon search-form">
              <v-icon v-text="'mdi-magnify'" size="20"></v-icon>
              <input
                style="width:100%"
                type="text"
                v-model="searchApp"
                :placeholder="$t('input_search')"
              />
            </div>
            <div class="table">
              <div class="head-table">
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
                  @click="sort(headCol[1], 1)"
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
                  style="width:60%"
                  @click="sort(headCol[2], 2)"
                >
                  <div class="column-name">
                    {{ $t('manageapp.text2') }}
                  </div>
                  <v-icon
                    v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
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
                  <div
                    class="body"
                    style="width:10%;padding-left:5px;padding-top:5px"
                  >
                    {{ item.index + 1 }}
                  </div>
                  <div class="body" style="width:30%;padding-top:5px">
                    {{ item['name_' + $i18n.locale] }}
                  </div>
                  <div class="body" style="width:60%;display:flex">
                    <div style="padding-top:5px;margin-right:15px">
                      {{ renderText(item) }}
                    </div>
                    <div
                      v-show="item.status_sso == 1 && item.type_login == 0"
                      :class="'input-with-icon disabled-input'"
                      style="display: flex;width: 200px;height: 30px;margin-right:10px"
                    >
                      <input
                        :disabled="true"
                        type="text"
                        v-model="item.username"
                        :placeholder="$t('input_selected')"
                      />
                    </div>
                    <v-btn
                      v-show="item.status_sso == 1 && !item.type_login"
                      text
                      @click="edit(item, index)"
                      class="cancel-btn"
                    >
                      {{
                        item.username == '' ? $t('btn_add') : $t('btn_change')
                      }}
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
      <v-card v-else>
        <div
          class="head-menu6 center-vh"
          style="display: flex;
              text-align:center;
              margin-top:30px;"
        >
          {{ $t('manageapp.text5') }}
        </div>
        <div
          style="color:#CE1212;
          font-size:13px;
          padding-top:5px;
          text-align:center;
          margin-bottom:55px;"
        >
          {{ viewListData['name_' + $i18n.locale] }}
        </div>
        <div class="rows" style="margin-bottom:30px;width:100%;display: flex;">
          <div style="width:20%;padding-top:3px" class="rows-name">
            {{ $t('manageapp.text6') }}
          </div>
          <div style="width:80%" class="rows-input">
            <div class="input-with-icon">
              <input
                style="width:100%"
                type="text"
                v-model="usernameList"
                :placeholder="$t('input_selected')"
              />
            </div>
          </div>
        </div>
        <div class="rows" style="width:100%;display: flex;">
          <div style="width:20%" class="rows-name">
            {{ $t('manageapp.text7') }}
          </div>
          <div style="width:80%" class="rows-input">
            <div class="input-with-icon">
              <input
                style="width:100%"
                type="password"
                v-model="passwordList"
                @keypress="IsNumber"
                :placeholder="$t('input_selected')"
              />
            </div>
            <div
              v-show="errorList"
              style="color:#CE1212;font-size:8px;padding-top:8px;padding-left:3px"
            >
              ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง
            </div>
          </div>
        </div>
        <div
          class="center-vh"
          style="margin-top:50px;margin-bottom:20px;display:flex"
        >
          <v-btn
            text
            @click="CloseSetAppDialogs()"
            class="ok-btn"
            :style="{ 'margin-right': '35px', width: '200px' }"
          >
            {{ $t('btn_cancel') }}
          </v-btn>
          <v-btn
            :disabled="disPwdBtnList"
            @click="ConfirmUsername()"
            class="cancel-btn"
            :style="{
              background: disPwdBtnList ? '#CE1212' : '',
              opacity: disPwdBtnList ? '0.51' : '',
              width: '200px'
            }"
          >
            {{ $t('btn_confirm') }}
          </v-btn>
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
            {{ $t('profile.account_17') }}
          </div>
          <div
            class="rows justify-center"
            v-if="profileView"
            style="margin-top:30px;margin-bottom:20px"
          >
            <v-btn
              text
              @click="CloseProfileDialog()"
              class="ok-btn"
              style="width:200px"
            >
              {{ $t('btn_close') }}
            </v-btn>
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
          <div class="scroll-auto">
            <div>
              <div class="head-menu5">
                {{ $t('profile.account_1') }}
              </div>
              <div class="line-page" style="margin-top:8px;"></div>
            </div>
            <div class="rows" style="margin-top:18px">
              <div style="width:20%" class="rows-name">
                {{ $t('profile.account_2') }}
              </div>
              <div
                :style="{
                  width: '80%',
                  'padding-left': '8px',
                  color: '#414141'
                }"
                class="rows-name"
              >
                {{
                  profile.type_login == 0
                    ? $t('master.type_login_0')
                    : $t('master.type_login_1')
                }}
              </div>
            </div>
            <div class="rows">
              <div style="width:20%" class="rows-name">
                {{ $t('profile.account_3') }}
              </div>
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
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_4') }}
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
                      v-model="nameTh"
                      :placeholder="$t('input_selected')"
                      :readonly="enableInput"
                    />
                  </div>
                </div>
              </div>
              <div style="width:50%;;display: flex;">
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_5') }}
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
                      v-model="nameEn"
                      :placeholder="$t('input_selected')"
                      :readonly="enableInput"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="rows">
              <div style="width:50%;display: flex;">
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_6') }}
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
                      v-model="nickname1Th"
                      :placeholder="
                        enableInput ? '-' : $t('input_not_selected')
                      "
                      :readonly="enableInput"
                    />
                  </div>
                </div>
              </div>
              <div style="width:50%;;display: flex;">
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_7') }}
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
                      v-model="nickname1En"
                      :placeholder="
                        enableInput ? '-' : $t('input_not_selected')
                      "
                      :readonly="enableInput"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="rows">
              <div style="width:50%;display: flex;">
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_8') }}
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
                      v-model="nickname2Th"
                      :placeholder="
                        enableInput ? '-' : $t('input_not_selected')
                      "
                      :readonly="enableInput"
                    />
                  </div>
                </div>
              </div>
              <div style="width:50%;;display: flex;">
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_9') }}
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
                      v-model="nickname2En"
                      :placeholder="
                        enableInput ? '-' : $t('input_not_selected')
                      "
                      :readonly="enableInput"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="rows">
              <div style="width:50%;display: flex;">
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_10') }}
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
                      v-model="postnameTh"
                      :placeholder="$t('input_selected')"
                      :readonly="enableInput"
                    />
                  </div>
                </div>
              </div>
              <div style="width:50%;;display: flex;">
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_11') }}
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
                      v-model="postnameEn"
                      :placeholder="$t('input_selected')"
                      :readonly="enableInput"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="rows">
              <div style="width:50%;display: flex;">
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_12') }}
                </div>
                <div style="width:60%" class="rows-input">
                  <div
                    class="input-with-icon"
                    :style="{
                      'box-shadow': renderEmail('shadow'),
                      width: ' 250px'
                    }"
                  >
                    <input
                      type="text"
                      @keypress="IsEmail"
                      v-model="emailInput"
                      :placeholder="
                        profile.type_login == 0
                          ? $t('input_not_selected')
                          : $t('input_selected')
                      "
                      :readonly="renderEmail('readonly')"
                    />
                  </div>
                </div>
              </div>
              <div style="width:50%;;display: flex;">
                <div style="width:40%" class="rows-name">
                  {{ $t('profile.account_13') }}
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
                      v-model="cxInput"
                      :placeholder="
                        enableInput ? '-' : $t('input_not_selected')
                      "
                      :readonly="enableInput"
                      @keypress="isNumberChar"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="rows" style="padding-bottom:3px">
              <div style="width:50%;display: flex;">
                <div style="width:40%;height:28px" class="rows-name">
                  {{ $t('profile.account_14') }}
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
                      v-model="phone"
                      :placeholder="
                        enableInput ? '-' : $t('input_not_selected')
                      "
                      :readonly="enableInput"
                      @keypress="isNumberPhone"
                    />
                  </div>
                  <div style="color:#CE1212;font-size:8px;padding-top:5px">
                    {{ $t('profile.account_15') }}
                  </div>
                </div>
              </div>
              <div style="width:50%;;display: flex;"></div>
            </div>
            <div
              class="rows justify-center"
              v-if="!profileView"
              style="margin-top:30px;margin-bottom:20px"
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
                {{ $t('profile.account_16') }}
              </v-btn>
              <v-btn
                v-show="!enableInput"
                text
                @click="closeProfile()"
                class="ok-btn"
                style="width:200px;margin-right: 15px"
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
                {{ $t('btn_save') }}
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize'
var bcrypt = require('bcryptjs')
var CryptoJS = require('crypto-js')
var aesEcb = require('aes-ecb')
export default {
  name: 'headers',
  props: {},
  data () {
    return {
      profilePicPath: '@/assets/images/account_demo.png',
      language: 'th',
      accountNameEng: '',
      stepChangePic: 0,
      showDefaultAccount: false,
      picDialog: false,
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
      sortNo: null,
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
      tranformScale: 'scale(1)',
      sysName: '20px',
      logo: '45px',
      resizeHeader: true,
      profileDialog: false,
      enableInput: true,
      profile: {},
      colInput: '0px 0px 3px #00000080',
      profileView: false,
      enableBtn: false,
      hasImage: false,
      file: '',
      viewListApp: true,
      viewListData: {},
      usernameList: '',
      passwordList: '',
      errorPasswordList: false,
      disPwdBtnList: true,
      masterList: [],
      mainSort: {
        feild: 'name_th',
        orderby: true
      },
      headCol: ['index', 'name_th', 'type_login'],
      errorList: false,
      nameTh: '',
      nameEn: '',
      nickname1Th: '',
      nickname1En: '',
      nickname2Th: '',
      nickname2En: '',
      postnameTh: '',
      postnameEn: '',
      emailInput: '',
      cxInput: '',
      phone: '',
      showPassword: false,
      showNewPassword: false,
      showCfNewPassword: false
    }
  },
  watch: {
    usernameList (newValue) {
      this.enableDisPwdBtnList()
    },
    passwordList (newValue) {
      this.enableDisPwdBtnList()
    },
    password (newValue) {
      if (newValue.length >= 6) {
        this.disPwdBtn = false
      } else {
        this.disPwdBtn = true
      }
    },
    newPassword (newValue) {
      let newPassword = JSON.stringify(newValue)
      let cfNewPassword = JSON.stringify(this.cfNewPassword)
      let password = JSON.stringify(this.password)
      if (newPassword == password) {
        this.errorNewPassword = true
      } else if (newPassword.length == cfNewPassword.length) {
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
      let password = JSON.stringify(this.password)
      if (newPassword == password) {
        this.errorCfNewPassword = true
      } else if (
        newValue.length > 0 &&
        this.newPassword.length <= newValue.length
      ) {
        if (newPassword == cfNewPassword) {
          this.errorCfNewPassword = false
        } else {
          this.errorCfNewPassword = true
        }
      } else {
        this.errorCfNewPassword = false
      }
      this.DisableBtn()
    },
    searchApp (todos) {
      let tempData = JSON.parse(JSON.stringify(this.masterList))
      if (todos.trim().length > 1) {
        let keyword = todos.trim()
        let temp = []
        let type = ''
        for (let i = 0; i < tempData.length; i++) {
          if (tempData[i].status_sso == 1) {
            type = tempData[i].type_login
              ? this.$t('master.type_login_1')
              : this.$t('manageapp.text4')
          } else {
            type = this.$t('manageapp.text3')
          }
          let str2 = tempData[i].name_th + type + tempData[i].name_en
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
    },
    picDialog (newValue) {
      this.$store.commit('SetDialogProfile', newValue)
    },
    nameTh: {
      handler: function (value) {
        if (value.length == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_\-]/g, '')
          if (temp.length > 0) {
            this.nameTh = temp
          } else {
            this.nameTh = ''
            this.checkBtn()
          }
        }
      }
    },
    nameEn: {
      handler: function (value) {
        if (value.length == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_\-]/g, '')
          if (temp.length > 0) {
            this.nameEn = temp
          } else {
            this.nameEn = ''
            this.checkBtn()
          }
        }
      }
    },
    nickname1Th: {
      handler: function (value) {
        let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_\-]/g, '')
        if (temp.length > 0) {
          this.nickname1Th = temp
        } else {
          this.nickname1Th = ''
          this.checkBtn()
        }
      }
    },
    nickname1En: {
      handler: function (value) {
        let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_\-]/g, '')
        if (temp.length > 0) {
          this.nickname1En = temp
        } else {
          this.nickname1En = ''
          this.checkBtn()
        }
      }
    },
    nickname2Th: {
      handler: function (value) {
        let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_\-]/g, '')
        if (temp.length > 0) {
          this.nickname2Th = temp
        } else {
          this.nickname2Th = ''
          this.checkBtn()
        }
      }
    },
    nickname2En: {
      handler: function (value) {
        let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_\-]/g, '')
        if (temp.length > 0) {
          this.nickname2En = temp
        } else {
          this.nickname2En = ''
          this.checkBtn()
        }
      }
    },
    postnameTh: {
      handler: function (value) {
        if (value.length == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_\-]/g, '')
          if (temp.length > 0) {
            this.postnameTh = temp
          } else {
            this.postnameTh = ''
            this.checkBtn()
          }
        }
      }
    },
    postnameEn: {
      handler: function (value) {
        if (value.length == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_\-]/g, '')
          if (temp.length > 0) {
            this.postnameEn = temp
          } else {
            this.postnameEn = ''
            this.checkBtn()
          }
        }
      }
    },
    emailInput: {
      handler: function (value) {
        if (value.length == 0) {
          this.enableBtn = true
        } else {
          let temp1 = value.replace(/[ก-๙]/g, '')
          let temp = temp1.replace(/[!~&`:;[/\]{}()<>="'%*+?,\\^$|#\s]/g, '')
          if (temp.length > 0) {
            this.emailInput = temp
          } else {
            this.emailInput = ''
            this.checkBtn()
          }
        }
      }
    },
    cxInput: {
      handler: function (value) {
        let temp = value.replace(/[^0-9a-zA-Z]/g, '')
        if (temp.length > 0) {
          this.cxInput = temp
        } else {
          this.cxInput = ''
          this.checkBtn()
        }
      }
    },
    phone: {
      handler: function (value) {
        let temp = value.replace(/[^0-9 \-]/g, '')
        if (temp.length > 0) {
          this.phone = temp
        } else {
          this.phone = ''
          this.checkBtn()
        }
      }
    }
  },
  computed: {
    info () {
      let data = this.$store.getters.user
      let isEmpty = Object.keys(data).length === 0
      if (!isEmpty) {
        if (data.image == '') {
          this.showDefaultAccount = true
        } else {
          this.showDefaultAccount = false
        }
        if (data.name_en.length > 0) {
          this.accountNameEng = data.name_en.substring(0, 1)
        } else if (data.name_th.length > 0) {
          this.accountNameEng = data.name_th.substring(0, 1)
        }
        if (data.language !== undefined) {
          this.language = data.language
        }
      }
      return data
    }
  },
  methods: {
    checkBtn () {
      let name_th = this.nameTh.trim()
      let name_en = this.nameEn.trim()
      let postname_th = this.postnameTh.trim()
      let postname_en = this.postnameEn.trim()
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
    isNumberPhone (evt) {
      var regex = new RegExp('^[0-9-]+$')
      var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode)
      if (!regex.test(key)) {
        evt.preventDefault()
        return false
      } else {
        this.checkBtn()
      }
    },
    IsEmail (evt) {
      var regex = new RegExp('^[a-zA-Z0-9@_.-]+$')
      var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode)
      if (!regex.test(key)) {
        evt.preventDefault()
        return false
      } else {
        this.checkBtn()
      }
    },
    isNumberChar (evt) {
      var regex = new RegExp('^[a-zA-Z0-9]+$')
      var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode)
      if (!regex.test(key)) {
        evt.preventDefault()
        return false
      } else {
        this.checkBtn()
      }
    },
    renderEmail (mode) {
      if (mode == 'shadow') {
        if (this.profile.type_login == 0) {
          return this.enableInput ? 'unset' : this.colInput
        } else {
          return 'unset'
        }
      } else {
        if (this.profile.type_login == 0) {
          return this.enableInput ? true : false
        } else {
          return true
        }
      }
    },
    ConfirmUsername () {
      var data = this.passwordList.trim()
      var key = this.viewListData.key_app
      let username = this.usernameList.trim()
      // var iv = 'FgLFXEr1MZl2mEnk'
      var iv = CryptoJS.lib.WordArray.random(16)
      let keyapp = username + key
      var encrypted = CryptoJS.AES.encrypt(data, keyapp, {
        iv: iv
      }).toString()

      // console.log(data)
      // console.log(key)
      // console.log(iv)
      // console.log(encrypted)
      // console.log(encodeURI(encrypted))
      // console.log("----------------->")
      let obj = {
        url: '',
        username: username,
        password: encodeURI(encrypted),
        host: '',
        api: ''
      }
      if (this.viewListData.key_app == 'SalesOpsKEY') {
        obj.url = '/auth/access-app?'
        obj.host = '10.7.200.162:82'
        obj.api = 'check-authen-app'
      } else if (
        this.viewListData.key_app == 'CorporateAndRollingSecretKeysAES'
      ) {
        let strKeyEn = keyapp.substring(0, 16)
        obj.url = '/api/auth/verify'
        obj.host = 'corp-plan.dhas.com'
        obj.password = aesEcb.encrypt(strKeyEn, data)
        obj.api = 'check-authen-corp'
      } else if (this.viewListData.key_app == 'mktopskey') {
        // username:nattaphat
        // password:Dh@sP@ssw0rd
        obj.url = '/api/login'
        obj.host = 'mkt.dhas.com'
        obj.password = CryptoJS.AES.encrypt(data, keyapp).toString()
        obj.api = 'check-authen-mktops'
      }

      this.$store
        .dispatch('CheckUserAccess', obj)
        .then(res => {
          this.errorList = false
          let obj2 = {
            emp_code: this.info.emp_code,
            username: this.usernameList.trim(),
            user_id: this.info.user_id,
            app_id: this.viewListData.app_id
          }
          this.$store.dispatch('UpdateUsernameSSO', obj2).then(res => {
            // this.viewListApp = true
            this.CloseSetAppDialogs()
            this.$store.commit('SetLoadHome', true)
          })
        })
        .catch(error => {
          this.errorList = true
          this.$store.commit('SetLoadHome', false)
        })
    },
    ChangePic () {
      if (this.stepChangePic == 0) {
        if (this.info.image == '') {
          this.stepChangePic = 4
          this.showDefaultAccount = true
        } else {
          this.stepChangePic = 1
          this.showDefaultAccount = false
        }
      }
    },
    DeletePic () {
      let req = {
        user_id: this.info.user_id
      }
      let id = document.getElementById('image-uploader-profile')
      if (id !== null) {
        let inputCur = id.getElementsByTagName('input')
        inputCur[0].value = ''
      }
      this.$store.dispatch('deletePicProfile', req).then(res => {
        this.showDefaultAccount = true
        this.stepChangePic = 3

        this.hasImage = false
        this.file = ''

        let data = JSON.parse(JSON.stringify(this.info))
        data.image = ''
        this.$store.commit('SetUser', data)
        sessionStorage.setItem('info', JSON.stringify(data))
        // location.reload()
      })
    },
    profileViewfile () {
      let profile = JSON.parse(JSON.stringify(this.profile))
      profile.name_th = this.nameTh
      profile.name_en = this.nameEn
      profile.nickname1_th = this.nickname1Th
      profile.nickname1_en = this.nickname1En
      profile.nickname2_th = this.nickname2Th
      profile.nickname2_en = this.nickname2En
      profile.postname_th = this.postnameTh
      profile.postname_en = this.postnameEn
      profile.email = this.emailInput
      profile.cx = this.cxInput
      profile.phone = this.phone
      this.$store.dispatch('updateProfile', profile).then(res => {
        this.$store.dispatch('getUserProfile', {}).then(res => {
          let data = JSON.parse(JSON.stringify(this.info))
          data.cx = res.data.success.data.cx
          data.email = res.data.success.data.email
          data.name_en = res.data.success.data.name_en
          data.name_th = res.data.success.data.name_th
          data.nickname1_en = res.data.success.data.nickname1_en
          data.nickname1_th = res.data.success.data.nickname1_th
          data.nickname2_en = res.data.success.data.nickname2_en
          data.nickname2_th = res.data.success.data.nickname2_th
          data.postname_en = res.data.success.data.postname_en
          data.postname_th = res.data.success.data.postname_th
          data.phone = res.data.success.data.phone
          this.$store.commit('SetUser', data)
          sessionStorage.setItem('info', JSON.stringify(data))
          this.profileView = true
          this.enableInput = true
        })
      })
    },
    editProfile () {
      this.enableInput = false
    },
    closeProfile () {
      this.profile = JSON.parse(JSON.stringify(this.info))
      this.enableInput = true
    },
    openProfile () {
      this.profileDialog = true
      this.profileView = false
      this.enableInput = true
      this.profile = JSON.parse(JSON.stringify(this.info))
      this.nameTh = this.profile.name_th
      this.nameEn = this.profile.name_en
      this.nickname1Th = this.profile.nickname1_th
      this.nickname1En = this.profile.nickname1_en
      this.nickname2Th = this.profile.nickname2_th
      this.nickname2En = this.profile.nickname2_en
      this.postnameTh = this.profile.postname_th
      this.postnameEn = this.profile.postname_en
      this.emailInput = this.profile.email
      this.cxInput = this.profile.cx
      this.phone = this.profile.phone
      this.checkBtn()
    },
    CloseProfileDialog () {
      this.profileDialog = false
      this.profile = {}
      this.nameTh = ''
      this.nameEn = ''
      this.nickname1Th = ''
      this.nickname1En = ''
      this.nickname2Th = ''
      this.nickname2En = ''
      this.postnameTh = ''
      this.postnameEn = ''
      this.emailInput = ''
      this.cxInput = ''
      this.phone = ''
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
      this.viewListApp = false
      this.viewListData = item
      this.usernameList = ''
      // this.usernameList = item.username
      this.passwordList = ''
      this.errorPasswordList = false
      this.disPwdBtnList = true
    },
    enableDisPwdBtnList () {
      if (this.usernameList.length > 3 && this.passwordList.length > 3) {
        this.disPwdBtnList = false
      } else {
        this.disPwdBtnList = true
      }
    },
    renderText (item) {
      if (item.status_sso == 1) {
        return item.type_login
          ? this.$t('master.type_login_1')
          : this.$t('manageapp.text4')
      } else {
        return this.$t('manageapp.text3')
      }
    },
    sort (feild, index) {
      this.sortNo = this.sortNo == index ? null : index
      let table = this.list
      if (feild == 'index') {
        if (this.mainSort.orderby) {
          this.list = table.sort(function (a, b) {
            return b.index - a.index
          })
        } else {
          this.list = table.sort(function (a, b) {
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
          this.list = table.sort((a, b) =>
            String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
              ? -1
              : 1
          )
        } else {
          this.list = table.sort((a, b) =>
            String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
              ? 1
              : -1
          )
        }
      }
    },
    SettingApp () {
      this.viewListApp = true
      let req = {
        group_id: this.info.group_id,
        user_id: this.info.user_id
      }
      this.list = []
      this.$store.dispatch('getHomeData', req).then(res => {
        let temp = []
        for (let i = 0; i < res.data.app.length; i++) {
          res.data.app[i].index = i
          temp.push(res.data.app[i])
        }
        this.list = temp
        this.masterList = temp
        this.setAppDialog = true
      })
    },
    CloseSetAppDialogs () {
      this.viewListApp = true
      this.viewListData = {}
      this.usernameList = ''
      this.passwordList = ''
      this.errorPasswordList = false
      this.setAppDialog = false
    },
    SetLanguages (value) {
      this.$i18n.locale = value
      this.language = value
      let req = {
        user_id: this.info.user_id,
        emp_code: this.info.emp_code,
        language: value
      }
      this.$store.commit('SetLanguage', value)
      this.$store.dispatch('UpdateLanguage', req).then(res => {
        let data = JSON.parse(JSON.stringify(this.info))
        data.language = value
        this.$store.commit('SetUser', data)
        sessionStorage.setItem('info', JSON.stringify(data))
      })

      // UpdateLanguage
    },
    DisableBtn () {
      let newPassword = JSON.stringify(this.newPassword)
      let cfNewPassword = JSON.stringify(this.cfNewPassword)
      let password = JSON.stringify(this.password)
      if (
        this.newPassword.length >= 6 &&
        this.cfNewPassword.length >= 6 &&
        newPassword == cfNewPassword
      ) {
        if (password == newPassword || password == cfNewPassword) {
          this.disPwdBtn = true
        } else {
          this.disPwdBtn = false
        }
      } else {
        this.disPwdBtn = true
      }
    },
    IsNumber (evt) {
      var regex = new RegExp('^[a-zA-Z0-9!@#$]+$')
      var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode)
      if (!regex.test(key)) {
        evt.preventDefault()
        return false
      }
    },
    InCondition1 (evt) {
      let value = evt.target.value
      let charac = /[-_=.%฿~`:;'"><^&{}/|+()[\]*\\]/g
      let rsCharac = value.search(charac)
      if (rsCharac >= 0) {
        this.errorNewPassword = true
        this.disPwdBtn = true
        this.newPassword = ''
      } else {
        let cfNewPassword = JSON.stringify(this.cfNewPassword)

        if (cfNewPassword == '""' && JSON.stringify(value) != '""') {
          this.disPwdBtn = true
        } else if (
          cfNewPassword == JSON.stringify(value) &&
          cfNewPassword == '""'
        ) {
          this.disPwdBtn = true
          this.errorNewPassword = false
          this.errorCfNewPassword = false
        } else {
          let password = JSON.stringify(this.password)
          let valueStr = JSON.stringify(value)
          let condChar = /[a-zA-Z]/g
          let condNum = /[0-9]/g
          let rsChar = valueStr.search(condChar)
          let rsNum = valueStr.search(condNum)

          if (
            rsChar >= 0 &&
            rsNum >= 0 &&
            cfNewPassword == valueStr &&
            cfNewPassword !== password
          ) {
            this.disPwdBtn = false
            this.errorNewPassword = false
            this.errorCfNewPassword = false
          } else {
            this.disPwdBtn = true
            this.errorNewPassword = true
          }
        }
      }
    },
    InCondition2 (evt) {
      let value = evt.target.value
      let charac = /[-_=.%฿~`:;'"><^&{}/|+()[\]*\\]/g
      let rsCharac = value.search(charac)
      if (rsCharac >= 0) {
        this.errorCfNewPassword = true
        this.disPwdBtn = true
        this.cfNewPassword = ''
      } else {
        let newPassword = JSON.stringify(this.newPassword)
        if (newPassword == '""' && JSON.stringify(value) != '""') {
          this.disPwdBtn = true
        } else if (
          newPassword == JSON.stringify(value) &&
          newPassword == '""'
        ) {
          this.disPwdBtn = true
          this.errorNewPassword = false
          this.errorCfNewPassword = false
        } else {
          let password = JSON.stringify(this.password)
          let valueStr = JSON.stringify(value)
          let condChar = /[a-zA-Z]/g
          let condNum = /[0-9]/g
          let rsChar = valueStr.search(condChar)
          let rsNum = valueStr.search(condNum)

          if (
            rsChar >= 0 &&
            rsNum >= 0 &&
            newPassword == valueStr &&
            newPassword !== password
          ) {
            this.disPwdBtn = false
            this.errorCfNewPassword = false
            this.errorNewPassword = false
          } else {
            this.disPwdBtn = true
            this.errorNewPassword = true
            this.errorCfNewPassword = true
          }
        }
      }
    },
    ConfirmDialogs () {
      if (this.stepChangePwd == 0) {
        var data = this.password
        var iv = CryptoJS.lib.WordArray.random(16)
        let keyapp = 'WebPortalKey'
        var encrypted = CryptoJS.AES.encrypt(data, keyapp, {
          iv: iv
        }).toString()

        let req = {
          user_id: this.info.user_id,
          old_password: encodeURI(encrypted)
        }
        this.$store
          .dispatch('changePassword', req)
          .then(res => {
            this.disPwdBtn = true
            this.errorPwd = false
            this.stepChangePwd = 1
            this.errorNewPassword = false
            this.errorCfNewPassword = false
          })
          .catch(error => {
            if (error && error.response && error.response.status === 400) {
              this.errorPwd = true
              this.disPwdBtn = true
            }
          })
      } else if (this.stepChangePwd == 1) {
        let req = {
          user_id: this.info.user_id,
          new_password: bcrypt.hashSync(this.newPassword, 10)
        }
        this.$store
          .dispatch('changePasswordNew', req)
          .then(res => {
            this.stepChangePwd = 2
          })
          .catch(error => {
            if (error && error.response && error.response.status === 400) {
            }
          })
      }
    },
    ClosePwdDialogs () {
      this.pwdDialog = false
      this.errorPwd = false
      this.errorNewPassword = false
      this.errorCfNewPassword = false
    },
    ChangePassword () {
      this.password = ''
      this.errorPwd = false
      this.error = false
      this.disPwdBtn = true
      this.stepChangePwd = 0
      this.newPassword = ''
      this.errorNewPassword = false
      this.cfNewPassword = ''
      this.errorCfNewPassword = false
      this.pwdDialog = true
    },
    renderProfileDesc () {
      if (this.stepChangePic == 0 || this.stepChangePic == 1) {
        return this.$t('profile.pic_1')
      } else if (this.stepChangePic == 2) {
        return this.$t('profile.pic_2')
      } else if (this.stepChangePic == 3) {
        return this.$t('profile.pic_3')
      } else if (this.stepChangePic == 4) {
        return this.$t('profile.pic_4')
      } else if (this.stepChangePic == 5) {
        return this.$t('profile.pic_5')
      }
    },
    renderBtnLeft () {
      if (this.stepChangePic == 0 || this.stepChangePic == 1) {
        return this.$t('btn_delete')
      } else if (this.stepChangePic == 2) {
        return this.$t('btn_cancel')
      } else if (this.stepChangePic == 3) {
        // return 'กำลังลบรูปภาพ...'
      } else if (this.stepChangePic == 4 || this.stepChangePic == 5) {
        return this.$t('btn_close')
      } else {
      }
    },
    onButtonClick () {
      this.$refs.uploader2.click()
    },
    setImage: function (output) {
      // console.log(output)
      this.hasImage = true
      this.file = output
      let formData = new FormData()
      formData.append('user_id', this.info.user_id)
      formData.append('image', output)
      this.$store.dispatch('uploadPicProfile', formData).then(res => {
        let data = JSON.parse(JSON.stringify(this.info))
        data.image = res.data
        this.stepChangePic = 5
        this.$store.commit('SetUser', data)
        sessionStorage.setItem('info', JSON.stringify(data))
      })
    },
    signOut () {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    },
    UploadPic () {
      this.picDialog = true
    },
    CloseDialogs () {
      this.picDialog = false
      this.stepChangePic = 0
    },
    isNumber (evt) {
      this.checkBtn()
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
      let data = JSON.parse(sessionStorage.getItem('info'))
      if (data.language !== undefined) {
        this.$i18n.locale = data.language
      }
      this.$store.commit('SetUser', data)
    }
  },
  components: {
    ImageUploader
  }
}
</script>
<style></style>
