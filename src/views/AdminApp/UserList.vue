<template>
  <div id="user-list" style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px;height: calc(100% - 10px);">
      <div class="detail-add">
        <!-- {{ enableBtn }} -->
        <div class="rows">
          <div style="width:20%" class="rows-name">
            {{ $t('profile.account_2') }}
          </div>
          <div
            v-if="editRow.mode == 'edit'"
            :style="{
              width: !statusPermission ? '62%' : '40%',
              display: 'flex'
            }"
            class="rows-name"
          >
            {{
              editRow.type_login == 0
                ? $t('master.type_login_0')
                : $t('master.type_login_1')
            }}
          </div>
          <div
            v-else
            :style="{
              width: !statusPermission ? '62%' : '40%',
              display: 'flex'
            }"
            class="rows-input"
          >
            <v-radio-group v-model="editRow.type_login" style="display:flex">
              <div class="radio" style="margin-right: 65px;">
                <v-radio
                  @click="selectedType(1)"
                  :color="'#CE1212'"
                  :value="1"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
                <div :class="'radio-text' + $i18n.locale">
                  {{ $t('master.type_login_1') }}
                </div>
              </div>
              <div class="radio">
                <v-radio
                  @click="selectedType(0)"
                  :color="'#CE1212'"
                  :value="0"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
                <div :class="'radio-text' + $i18n.locale">
                  {{ $t('master.type_login_0') }}
                </div>
              </div>
            </v-radio-group>
          </div>
          <div
            :style="{
              width: !statusPermission ? '18%' : '40%',
              display: 'flex'
            }"
            class="rows-input"
          >
            <v-checkbox
              @click="selectedPermission($event)"
              color="red"
              v-model="editRow.status_permission"
              hide-details
            ></v-checkbox>
            <div style="padding-top:5px">{{ $t('user.text10') }}</div>
            <div
              class="input-with-icon"
              v-show="statusPermission"
              style="height:25px;margin-left:15px"
            >
              <v-select
                v-model="editRow.admin_menu"
                :items="items_menu"
                :placeholder="$t('input_selected')"
                :item-text="'name_' + $i18n.locale"
                item-value="menu_id"
                persistent-hint
                single-line
              >
              </v-select>
            </div>
          </div>
        </div>
        <div
          class="rows"
          v-show="editRow.type_login == 1 && editRow.mode == 'add'"
        >
          <div style="width:20%" class="rows-name">{{ $t('user.text12') }}</div>
          <div style="width:80%;display:flex" class="rows-input">
            <div class="input-with-icon" style="width: 200px;">
              <div class="input-with-icon" style="width: 200px;">
                <input
                  type="text"
                  v-model="searchEmpCode"
                  :placeholder="$t('user.text13')"
                  maxlength="250"
                  v-on:keyup.enter="onEnter"
                />
              </div>
            </div>
            <v-btn
              @click="openPopupType()"
              class="cancel-btn"
              style="height:25px;width:32px;min-width:32px;margin-left:8px"
            >
              <v-icon
                v-text="'mdi-magnify'"
                style="color:#ffffff"
                size="18"
              ></v-icon>
            </v-btn>
          </div>
        </div>
        <div class="rows">
          <div style="width:20%" class="rows-name">
            {{ $t('profile.account_3') }}
          </div>
          <div style="width:80%" class="rows-input">
            <div class="input-with-icon" style="width: 200px;">
              <input
                type="text"
                @keypress="isNumberChar"
                v-model="empCode"
                :placeholder="$t('input_selected')"
                :disabled="editRow.type_login == 1 ? true : false"
                :style="{
                  background: editRow.type_login == 1 ? '#D1D1D1' : ''
                }"
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
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="nameTh"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              {{ $t('profile.account_5') }}
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="nameEn"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="nickname1Th"
                  :placeholder="$t('input_not_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              {{ $t('profile.account_7') }}
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="nickname1En"
                  :placeholder="$t('input_not_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="nickname2Th"
                  :placeholder="$t('input_not_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              {{ $t('profile.account_9') }}
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="nickname2En"
                  :placeholder="$t('input_not_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="postnameTh"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              {{ $t('profile.account_11') }}
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="postnameEn"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
              <div class="input-with-icon">
                <input
                  type="text"
                  @keypress="IsEmail"
                  v-model="emailInput"
                  :disabled="enableInput"
                  :placeholder="
                    editRow.type_login == 0
                      ? $t('input_not_selected')
                      : $t('input_selected')
                  "
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              {{ $t('profile.account_13') }}
            </div>
            <div style="width:60%;padding-right:25px" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  @keypress="isNumberChar"
                  v-model="cxInput"
                  :placeholder="$t('input_not_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="rows" style="padding-bottom:3px">
          <div style="width:50%;display: flex;">
            <div style="width:40%;height:27px" class="rows-name">
              {{ $t('profile.account_14') }}
            </div>
            <div style="width:60%" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  @keypress="isNumberPhone"
                  v-model="phone"
                  :placeholder="$t('input_not_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
              <div style="color:#CE1212;font-size:8px;padding-top:5px">
                {{ $t('profile.account_15') }}
              </div>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%;height:27px" class="rows-name">
              {{ $t('user.text5') }}
            </div>
            <div
              style="width:60%;padding-right:25px;padding-top:5px"
              class="rows-input"
            >
              <v-radio-group v-model="editRow.status" style="display:flex">
                <div class="radio" style="margin-right: 30px;">
                  <v-radio
                    @click="selectedStatus(1)"
                    :color="'#CE1212'"
                    :value="1"
                    :ripple="false"
                    :messages="false"
                    :light="false"
                  ></v-radio>
                  <div :class="'radio-text' + $i18n.locale">
                    {{ $t('user.text7') }}
                  </div>
                </div>
                <div class="radio">
                  <v-radio
                    @click="selectedStatus(0)"
                    :color="'#CE1212'"
                    :value="0"
                    :ripple="false"
                    :messages="false"
                    :light="false"
                  ></v-radio>
                  <div :class="'radio-text' + $i18n.locale">
                    {{ $t('user.text8') }}
                  </div>
                </div>
              </v-radio-group>
            </div>
          </div>
        </div>
        <div
          class="rows"
          v-show="editRow.type_login == 0"
          style="margin-top:8px"
        >
          <div style="width:50%;display: flex;">
            <div style="width:40%" class="rows-name">
              {{ $t('manageapp.text6') }}
            </div>
            <div style="width:60%;display:flex" class="rows-input">
              <div class="input-with-icon" style="margin-right:10px">
                <input
                  type="text"
                  v-model="username"
                  @keypress="IsPassword"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
              <v-tooltip bottom color="red">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    v-text="'mdi-alert-circle'"
                    style="color:#CE1212"
                    size="20"
                  ></v-icon>
                </template>
                <span style="font-size:13px"
                  >{{ $t('user.text15') }}<br />
                  {{ $t('user.text16') }}</span
                >
              </v-tooltip>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              {{ $t('manageapp.text7') }}
            </div>
            <div
              style="width:60%;padding-right:25px;display:flex;"
              class="rows-input"
            >
              <div class="input-with-icon" style="margin-right:10px">
                <input
                  type="password"
                  v-model="password"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  @keypress="IsPassword"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
              <v-tooltip bottom color="red">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    v-text="'mdi-alert-circle'"
                    style="color:#CE1212"
                    size="20"
                  ></v-icon>
                </template>
                <span style="font-size:13px"
                  >{{ $t('pwd.text9') }}<br />
                  {{ $t('pwd.text7') }}<br />
                  {{ $t('pwd.text8') }}</span
                >
              </v-tooltip>
            </div>
          </div>
        </div>
        <div
          class="rows"
          :style="{ 'margin-top': editRow.type_login == 1 ? '8px' : '0px' }"
        >
          <div style="width:20%" class="rows-name">
            {{ $t('user.text3') }}
          </div>
          <div style="width:80%" class="rows-input">
            <div class="input-with-icon" style="width: 300px;">
              <v-select
                :disabled="enableInput"
                :style="{ background: enableInput ? '#D1D1D1' : '' }"
                v-on:change="selectedGroup"
                v-model="editRow.group_id"
                :items="items"
                :placeholder="$t('input_selected')"
                :item-text="'name_' + $i18n.locale"
                item-value="group_id"
                persistent-hint
                single-line
              >
              </v-select>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:20%" class="rows-name"></div>
          <div
            style="width:80%;height: 100%"
            class="rows-input"
            v-if="applist.length > 0"
          >
            <div class="table" style="padding-left:0px">
              <div class="head-table">
                <div
                  class="head"
                  style="width:10%"
                  @click="sort2(headCol2[0], 0)"
                >
                  <div class="column-name">{{ $t('set.list_col1') }}</div>
                  <v-icon
                    v-text="sortNo2 == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="20"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:30%"
                  @click="sort2(headCol2[1], 1)"
                >
                  <div class="column-name">
                    {{ $t('manageapp.text1') }}
                  </div>
                  <v-icon
                    v-text="sortNo2 == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:60%"
                  @click="sort2(headCol2[2], 2)"
                >
                  <div class="column-name">
                    {{ $t('manageapp.text2') }}
                  </div>
                  <v-icon
                    v-text="sortNo2 == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
              </div>
              <div class="body-table">
                <div v-if="applist.length == 0" class="no-data">
                  {{ $t('popup.text9') }}
                </div>
                <div
                  class="body-row"
                  v-for="(item, index) in applist"
                  :key="'app_name_' + index"
                >
                  <div
                    class="body"
                    style="width:10%;padding-top:5px;padding-left:7px"
                  >
                    {{ item.index + 1 }}
                  </div>
                  <div class="body" style="width:30%;padding-top:5px">
                    {{ item['name_' + $i18n.locale] }}
                  </div>
                  <div
                    class="body"
                    style="width:60%;padding-top:5px;display:flex"
                  >
                    <div>
                      {{ renderAcess(item) }}
                    </div>
                    <div
                      v-show="item.status_sso == 1 && item.type_login == 0"
                      class="input-with-icon"
                      style="margin-left:15px"
                    >
                      <input
                        type="text"
                        v-model="item.username"
                        :placeholder="$t('input_not_selected')"
                      />
                      <!-- :disabled="enableInput"
                        :style="{ background: enableInput ? '#D1D1D1' : '' }" -->
                    </div>
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

    <v-dialog v-model="empeDialog" :max-width="'850'">
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
            {{ $t('user.text14') }}
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
              <div class="right-action justify-end" style="width:20%;"></div>
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
                  style="width:20%"
                  @click="sort(headCol[1], 1)"
                >
                  <div class="column-name">{{ $t('profile.account_3') }}</div>
                  <v-icon
                    v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:30%"
                  @click="sort(headCol[2], 2)"
                >
                  <div class="column-name">
                    {{ $t('user.text1') }}
                  </div>
                  <v-icon
                    v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:30%"
                  @click="sort(headCol[3], 3)"
                >
                  <div class="column-name">
                    {{ $t('user.text2') }}
                  </div>
                  <v-icon
                    v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div class="head center-vh" style="width:10%">
                  <div class="column-name">
                    {{ $t('set.list_col6') }}
                  </div>
                </div>
              </div>
              <div class="body-table" style="height: 290px">
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
                  <div class="body" style="width:20%;padding-top:5px">
                    {{ item.emp_code }}
                  </div>
                  <div class="body" style="width:30%;padding-top:5px">
                    {{ item['name_' + $i18n.locale] }}
                  </div>
                  <div class="body" style="width:30%;padding-top:5px">
                    {{ item['postname_' + $i18n.locale] }}
                  </div>
                  <div
                    class="body center-vh"
                    style="width:10%;padding-top:5px;cursor:pointer"
                  >
                    <img
                      src="@/assets/icons/verified_black.svg"
                      @click="selectedUser(item)"
                    />
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
var bcrypt = require('bcryptjs')
export default {
  name: 'user-list',
  props: {
    data: {
      type: Object,
      required: true
    },
    master: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editRow: this.data,
      dialog: false,
      errorDialog: this.$t('popup.text1'),
      error: false,
      rightBtn: this.$t('btn_save'),
      empeDialog: false,
      sortNo: null,
      headCol: ['index', 'emp_code', 'name_th', 'postname_th'],
      sortNo2: null,
      headCol2: ['index', 'name_th', 'username'],
      mainSort: {
        feild: 'emp_code',
        orderby: true
      },
      mainSort2: {
        feild: 'name_th',
        orderby: true
      },
      searchApp: '',
      searchEmpCode: '',
      list: [],
      items: [],
      applist: [],
      enableInput: true,
      items_menu: [
        {
          name_th: 'ข้อมูลผู้ใช้งาน',
          name_en: 'User Information',
          menu_id: 0
        },
        {
          name_th: 'ทั้งหมด',
          name_en: 'All Menu',
          menu_id: 1
        }
      ],
      statusPermission: false,
      enableBtn: true,
      oldUsername: this.data.password,
      oldPassword: this.data.origin_password,
      defaultPassword: '99999999',
      typeLogin: 1,
      masterEdit: {},
      empCode: this.data.emp_code,
      nameTh: this.data.name_th,
      nameEn: this.data.name_en,
      nickname1Th: this.data.nickname1_th,
      nickname1En: this.data.nickname1_en,
      nickname2Th: this.data.nickname2_th,
      nickname2En: this.data.nickname2_en,
      postnameTh: this.data.postname_th,
      postnameEn: this.data.postname_en,
      emailInput: this.data.email,
      cxInput: this.data.cx,
      phone: this.data.phone,
      username: this.data.username,
      password: this.data.password
    }
  },
  computed: {
    info () {
      return this.$store.getters.user
    }
  },
  watch: {
    searchApp: {
      handler: function (todos) {
        if (todos.trim().length > 1 || todos.trim().length == 0) {
          let req = {
            emp_code: todos.trim()
          }
          this.$store
            .dispatch('searchEmpLdap', req)
            .then(res => {
              this.list = res.data
            })
            .catch(error => {
              if (error && error.response && error.response.status === 500) {
                if (this.editRow.mode == 'add') {
                  this.editRow = JSON.parse(JSON.stringify(this.master))
                  this.applist = []
                }
                this.list = []
              } else if (
                error &&
                error.response &&
                error.response.status === 401
              ) {
                this.btnClick = 'error'
                this.dialog = true
                this.error = true
                this.errorDialog =
                  this.$t('popup.text2') +
                  ' (Error Code ' +
                  error.response.status +
                  ')'
                this.list = []
              }
            })
        }
      }
    },
    empCode: {
      handler: function (value) {
        if (
          (typeof value === 'number' && value > 0) ||
          typeof value === 'string'
        ) {
          if (value.length == 0) {
            this.enableBtn = true
          } else {
            let temp = value.replace(/[^0-9a-zA-Z]/g, '')
            if (temp.length > 0) {
              this.empCode = temp
            } else {
              this.empCode = ''
            }
            this.checkBtn()
          }
        }
      }
    },
    nameTh: {
      handler: function (value) {
        if (value.length == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_]/g, '')
          if (temp.length > 0) {
            this.nameTh = temp
          } else {
            this.nameTh = ''
          }
          this.checkBtn()
        }
      }
    },
    nameEn: {
      handler: function (value) {
        if (value.length == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_]/g, '')
          if (temp.length > 0) {
            this.nameEn = temp
          } else {
            this.nameEn = ''
          }
          this.checkBtn()
        }
      }
    },
    nickname1Th: {
      handler: function (value) {
        let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_]/g, '')
        if (temp.length > 0) {
          this.nickname1Th = temp
        } else {
          this.nickname1Th = ''
        }
        this.checkBtn()
      }
    },
    nickname1En: {
      handler: function (value) {
        let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_]/g, '')
        if (temp.length > 0) {
          this.nickname1En = temp
        } else {
          this.nickname1En = ''
        }
        this.checkBtn()
      }
    },
    nickname2Th: {
      handler: function (value) {
        let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_]/g, '')
        if (temp.length > 0) {
          this.nickname2Th = temp
        } else {
          this.nickname2Th = ''
        }
        this.checkBtn()
      }
    },
    nickname2En: {
      handler: function (value) {
        let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_]/g, '')
        if (temp.length > 0) {
          this.nickname2En = temp
        } else {
          this.nickname2En = ''
        }
        this.checkBtn()
      }
    },
    postnameTh: {
      handler: function (value) {
        if (value.length == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_]/g, '')
          if (temp.length > 0) {
            this.postnameTh = temp
          } else {
            this.postnameTh = ''
          }
          this.checkBtn()
        }
      }
    },
    postnameEn: {
      handler: function (value) {
        if (value.length == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^ก-๙0-9a-zA-Z \[\]\\(\)\{\}\_]/g, '')
          if (temp.length > 0) {
            this.postnameEn = temp
          } else {
            this.postnameEn = ''
          }
          this.checkBtn()
        }
      }
    },
    emailInput: {
      handler: function (value) {
        if (value.length == 0 && this.editRow.type_login == 1) {
          this.enableBtn = true
        } else {
          let temp1 = value.replace(/[ก-๙]/g, '')
          let temp = temp1.replace(/[!~&`:;[/\]{}()<>="'%*+?,\\^$|#\s]/g, '')
          if (temp.length > 0) {
            this.emailInput = temp
          } else {
            this.emailInput = ''
          }
          this.checkBtn()
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
        }
        this.checkBtn()
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
    },
    username: {
      handler: function (value) {
        if (value.length < 6 && this.editRow.type_login == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^0-9a-zA-Z]/g, '')
          if (temp.length > 0) {
            this.username = temp
          } else {
            this.username = ''
          }
          this.checkBtn()
        }
      }
    },
    password: {
      handler: function (value) {
        if (value.length < 6 && this.editRow.type_login == 0) {
          this.enableBtn = true
        } else {
          let temp = value.replace(/[^0-9a-zA-Z\!\@\#\$]/g, '')

          let condChar = /[a-zA-Z]*$/
          let condNum = /[0-9]*$/
          let conRsChar = temp.search(condChar)
          let conRsNum = temp.search(condNum)

          if (temp.length > 0) {
            this.password = temp
            if (conRsChar <= 0 || conRsNum <= 0) {
              this.enableBtn = true
            } else if (conRsChar >= 0 && conRsNum >= 0) {
              this.checkBtn()
            }
          } else {
            this.password = ''
            this.checkBtn()
          }
        }
      }
    }
  },
  methods: {
    checkBtn () {
      let item = JSON.parse(JSON.stringify(this.editRow))
      let group_id = item.group_id.toString()
      let name_th = this.nameTh.trim()
      let name_en = this.nameEn.trim()
      let postname_th = this.postnameTh.trim()
      let postname_en = this.postnameEn.trim()
      let emp_code = this.empCode.toString()
      let email = this.emailInput.trim()
      let password = ''
      if (this.password !== undefined) {
        password = this.password.trim()
      }

      if (
        group_id.length > 0 &&
        name_th.length > 0 &&
        name_en.length > 0 &&
        postname_th.length > 0 &&
        postname_en.length > 0 &&
        emp_code.trim().length > 0 &&
        this.applist.length > 0
      ) {
        if (item.type_login == 0) {
          let username = this.username.trim()
          if (username.length > 5 && password == this.defaultPassword) {
            this.enableBtn = false
          } else {
            let password = this.password.trim()
            if (
              username.length > 5 &&
              password.length > 5 &&
              this.InCondition(password)
            ) {
              this.enableBtn = false
            } else {
              this.enableBtn = true
            }
          }
        } else {
          if (email.length > 0) {
            this.enableBtn = false
          } else {
            this.enableBtn = true
          }
        }
      } else {
        this.enableBtn = true
      }
    },
    renderAcess (item) {
      if (item.status_sso == 1) {
        return item.type_login
          ? this.$t('master.type_login_1')
          : this.$t('manageapp.text4')
      } else {
        return this.$t('manageapp.text3')
      }
    },
    selectedPermission (evt) {
      this.statusPermission = this.editRow.status_permission
      this.checkBtn()
    },
    selectedType (value) {
      if (this.typeLogin !== value && this.editRow.mode == 'add') {
        this.searchEmpCode = ''
        this.typeLogin = value
        this.editRow = JSON.parse(JSON.stringify(this.master))
        this.empCode = ''
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
        this.username = ''
        this.editRow.emp_code = ''
        this.applist = []
        this.statusPermission = false
      }
      this.editRow.type_login = value
      this.checkBtn()
      if (this.editRow.mode == 'add') {
        if (value == 1 && this.editRow.emp_code == '') {
          this.enableInput = true
        } else {
          this.enableInput = false
        }
      } else {
      }
    },
    selectedStatus (value) {
      this.editRow.status = value
      this.checkBtn()
    },
    selectedUser (value) {
      this.empeDialog = false
      let mode = this.editRow.mode
      this.editRow = value
      this.editRow.mode = mode
      this.editRow.password = ''
      this.editRow.status = 1
      this.password = ''
      this.empCode = value.emp_code
      this.nameTh = value.name_th
      this.nameEn = value.name_en
      this.nickname1Th = value.nickname1_th
      this.nickname1En = value.nickname1_en
      this.nickname2Th = value.nickname2_th
      this.nickname2En = value.nickname2_en
      this.postnameTh = value.postname_th
      this.postnameEn = value.postname_en
      this.emailInput = value.email
      this.cxInput = value.cx
      this.phone = value.phone
      this.username = value.username
      this.enableInput = false
      this.checkBtn()
    },
    selectedGroup (value) {
      if (this.editRow.user_id !== null) {
        let user_id = this.editRow.user_id.toString()
        let req = {
          group_id: value,
          user_id: user_id.trim() == 0 ? 0 : this.editRow.user_id
        }
        this.$store.dispatch('getDroupdownGroup', req).then(res => {
          let temp = []
          let feild = 'name_th'
          let sortData = res.data.app
          sortData = sortData.sort((a, b) =>
            String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
              ? -1
              : 1
          )
          for (let i = 0; i < sortData.length; i++) {
            sortData[i].index = i
            let username =
              sortData[i].username == null ? '' : sortData[i].username
            if (this.editRow.mode == 'add' && username.trim().length == 0) {
              sortData[i].username = this.editRow.username
            }
            temp.push(sortData[i])
          }
          this.applist = temp
          this.checkBtn()
        })
      }
    },
    sort2 (feild, index) {
      this.sortNo2 = this.sortNo2 == index ? null : index
      let table = this.applist
      if (feild == 'index') {
        if (this.mainSort2.orderby) {
          this.applist = table.sort(function (a, b) {
            return b.index - a.index
          })
        } else {
          this.applist = table.sort(function (a, b) {
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

        if (this.mainSort2.orderby) {
          this.applist = table.sort((a, b) =>
            String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
              ? -1
              : 1
          )
        } else {
          this.applist = table.sort((a, b) =>
            String(a[feild]).toLowerCase() < String(b[feild]).toLowerCase()
              ? 1
              : -1
          )
        }
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
    onEnter () {
      let req = {
        emp_code: this.searchEmpCode.trim()
      }
      if (req.emp_code.length > 0) {
        let mode = this.editRow.mode
        this.$store
          .dispatch('searchEmpLdap', req)
          .then(res => {
            if (res.data.length == 1) {
              this.enableInput = false
              this.editRow = res.data[0]
              this.editRow.mode = mode
              this.editRow.status = 1
              this.editRow.password = ''
              this.password = ''
              this.empCode = res.data[0].emp_code
              this.nameTh = res.data[0].name_th
              this.nameEn = res.data[0].name_en
              this.nickname1Th = res.data[0].nickname1_th
              this.nickname1En = res.data[0].nickname1_en
              this.nickname2Th = res.data[0].nickname2_th
              this.nickname2En = res.data[0].nickname2_en
              this.postnameTh = res.data[0].postname_th
              this.postnameEn = res.data[0].postname_en
              this.emailInput = res.data[0].email
              this.cxInput = res.data[0].cx
              this.phone = res.data[0].phone
              this.username = res.data[0].username
            } else if (res.data.length > 1) {
              this.empeDialog = true
              this.list = res.data
            }
          })
          .catch(error => {
            if (error && error.response && error.response.status === 500) {
              this.list = []
              if (this.editRow.mode == 'add') {
                this.editRow = JSON.parse(JSON.stringify(this.master))
                this.applist = []
              }
            } else if (
              error &&
              error.response &&
              error.response.status === 401
            ) {
              this.btnClick = 'error'
              this.dialog = true
              this.error = true
              this.errorDialog =
                this.$t('popup.text2') +
                ' (Error Code ' +
                error.response.status +
                ')'
              this.list = []
            }
          })
      }
    },
    openPopupType () {
      if (this.searchEmpCode.trim() > 3) {
        let req = {
          emp_code: this.searchEmpCode.trim()
        }
        this.$store
          .dispatch('searchEmpLdap', req)
          .then(res => {
            this.empeDialog = true
            this.list = res.data
          })
          .catch(error => {
            if (error && error.response && error.response.status === 500) {
              this.list = []
              if (this.editRow.mode == 'add') {
                this.editRow = JSON.parse(JSON.stringify(this.master))
                this.applist = []
              }
            } else if (
              error &&
              error.response &&
              error.response.status === 401
            ) {
              this.btnClick = 'error'
              this.dialog = true
              this.error = true
              this.errorDialog =
                this.$t('popup.text2') +
                ' (Error Code ' +
                error.response.status +
                ')'
              this.list = []
            }
          })
      }
    },
    CloseDialogs () {
      this.empeDialog = false
      this.searchApp = ''
    },
    cancelBtn () {
      let str1 =
        this.editRow.mode == 'add'
          ? JSON.stringify(this.master)
          : this.masterEdit
      let result = JSON.parse(JSON.stringify(this.editRow))
      result.emp_code = this.empCode
      result.name_th = this.nameTh
      result.name_en = this.nameEn
      result.nickname1_th = this.nickname1Th
      result.nickname1_en = this.nickname1En
      result.nickname2_th = this.nickname2Th
      result.nickname2_en = this.nickname2En
      result.postname_th = this.postnameTh
      result.postname_en = this.postnameEn
      result.email = this.emailInput
      result.cx = this.cxInput
      result.phone = this.phone
      result.username = this.username
      result.password = this.password
      let str2 = JSON.stringify(result)

      if (str1 == str2) {
        this.cancel()
      } else {
        this.error = false
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
      this.error = false
      this.dialog = false
      this.rightBtn = this.$t('btn_save')
    },
    clearBtn () {
      this.btnClick = 'clear'
      this.dialog = true
      this.errorDialog = this.$t('popup.text3')
      this.rightBtn = this.$t('btn_delete')
    },
    saveBtn () {
      this.btnClick = 'save'
      let item = this.editRow
      if (this.enableBtn == false) {
        if (
          (this.password !== this.oldPassword ||
            item.username !== this.oldUsername) &&
          this.editRow.mode == 'edit' &&
          this.password != this.defaultPassword
        ) {
          this.dialog = true
          this.errorDialog =
            'พบการแก้ไขข้อมูล Username หรือ Password กรุณายืนยันการดำเนินการแก้ไข และบันทึกข้อมูลทั้งหมด'
          this.rightBtn = this.$t('btn_save')
        } else {
          this.error = false
          this.dialog = true
          this.errorDialog = this.$t('popup.text1')
          this.rightBtn = this.$t('btn_save')
        }
      } else {
        console.log('Valid...', item)
      }
    },
    save () {
      if (this.btnClick == 'save') {
        let result = JSON.parse(JSON.stringify(this.editRow))
        let arr = []
        var pwdCrypt = this.password
        if (this.password == this.defaultPassword) {
          pwdCrypt = this.oldPassword
        } else {
          if (this.password !== this.oldPassword) {
            pwdCrypt = bcrypt.hashSync(this.password, 10)
          }
        }
        result.password = result.type_login == 1 ? 'LDAP' : pwdCrypt
        result.status_permission = result.status_permission ? 1 : 0
        result.admin_menu =
          result.admin_menu.length == 0 ? 0 : result.admin_menu
        for (let i = 0; i < this.applist.length; i++) {
          arr.push({
            app_id: this.applist[i].app_id,
            username:
              this.applist[i].type_login == 0
                ? this.applist[i].username
                : result.username,
            password: 'LDAP'
          })
        }
        result.app = JSON.stringify(arr)
        let url = this.editRow.mode == 'add' ? 'registerUser' : 'updateUser'

        result.emp_code = this.empCode
        result.name_th = this.nameTh
        result.name_en = this.nameEn
        result.nickname1_th = this.nickname1Th
        result.nickname1_en = this.nickname1En
        result.nickname2_th = this.nickname2Th
        result.nickname2_en = this.nickname2En
        result.postname_th = this.postnameTh
        result.postname_en = this.postnameEn
        result.email = this.emailInput
        result.cx = this.cxInput
        result.phone = this.phone

        if (this.editRow.type_login == 1) {
          this.$store.dispatch(url, result).then(res => {
            if (res.data.success == undefined) {
              this.btnClick = 'error'
              this.dialog = true
              this.error = true
              this.errorDialog = this.$t('popup.text8')
              this.rightBtn = this.$t('btn_close')
            } else {
              if (
                this.editRow.mode == 'edit' &&
                this.info.user_id == result.user_id &&
                this.info.type_login == result.type_login
              ) {
                this.$router.push('/')
              } else {
                this.$emit('save', null)
              }
              this.dialog = false
            }
          })
        } else {
          if (this.InCondition(this.password)) {
            result.username = this.username
            this.$store.dispatch(url, result).then(res => {
              if (res.data.success == undefined) {
                this.btnClick = 'error'
                this.dialog = true
                this.error = true
                this.errorDialog = this.$t('popup.text8')
                this.rightBtn = this.$t('btn_close')
              } else {
                if (
                  this.editRow.mode == 'edit' &&
                  this.info.user_id == result.user_id &&
                  this.info.type_login == result.type_login
                ) {
                  this.$router.push('/')
                } else {
                  this.$emit('save', null)
                }
                this.dialog = false
              }
            })
          } else {
            console.log('No save...')
          }
        }
      } else if (this.btnClick == 'clear') {
        this.clear()
      } else if (this.btnClick == 'cancel') {
        this.dialog = false
        this.rightBtn = this.$t('btn_save')
        this.$emit('cancel', null)
      } else {
        this.dialog = false
      }
    },
    clear () {
      let result = {
        user_id: this.editRow.user_id
      }
      this.$store.dispatch('delteUser', result).then(res => {
        this.dialog = false
        if (
          this.editRow.mode == 'edit' &&
          this.info.user_id == result.user_id &&
          this.info.type_login == result.type_login
        ) {
          this.$router.push('/')
        } else {
          this.$emit('clear', null)
        }
      })
    },
    InCondition (value) {
      if (value == this.defaultPassword && this.editRow.mode == 'edit') {
        return true
      } else if (value.length >= 6) {
        let condChar = /[a-zA-Z]/g
        let condNum = /[0-9]/g
        let rsChar = value.search(condChar)
        let rsNum = value.search(condNum)
        if (rsChar >= 0 && rsNum >= 0) {
          return true
        } else {
          return false
        }
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
    isNumber (evt) {
      var regex = new RegExp('^[0-9]+$')
      var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode)
      if (!regex.test(key)) {
        evt.preventDefault()
        return false
      } else {
        this.checkBtn()
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
    IsPassword (evt) {
      var regex = new RegExp('^[a-zA-Z0-9!@#$]+$')
      var key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode)
      if (!regex.test(key)) {
        evt.preventDefault()
        return false
      } else {
        this.checkBtn()
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
    let reqSearch = {
      keyword: '',
      field: 'name_th',
      sort: 'asc'
    }
    if (this.editRow.mode == 'add') {
      this.enableInput = true
      this.statusPermission = false
      this.$store.dispatch('getGroupList', reqSearch).then(res => {
        this.items = res.data
        this.applist = []
      })
    } else {
      this.masterEdit = JSON.stringify(this.editRow)
      this.enableInput = false
      this.statusPermission = this.editRow.status_permission
      let req = {
        group_id: this.editRow.group_id,
        user_id: this.editRow.user_id
      }
      this.$store.dispatch('getGroupList', reqSearch).then(res => {
        this.items = res.data
        this.applist = []
        this.$store.dispatch('getDroupdownGroup', req).then(res => {
          let temp = []
          for (let i = 0; i < res.data.app.length; i++) {
            res.data.app[i].index = i
            temp.push(res.data.app[i])
          }
          this.applist = temp
          // this.editRow.password = this.defaultPassword
          this.checkBtn()
        })
      })
    }
  },
  mounted () {}
}
</script>
