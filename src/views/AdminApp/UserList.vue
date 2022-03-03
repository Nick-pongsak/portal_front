<template>
  <div id="user-list" style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px;height: calc(100% - 10px);">
      <div class="detail-add">
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
                <div style="padding-top:4px">
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
                <div style="padding-top:4px">
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
                @keypress="IsEmail"
                v-model="editRow.emp_code"
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
                  v-model="editRow.name_th"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                  @keyup="enableBtnSave"
                  @keypress="enableBtnSave"
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
                  v-model="editRow.name_en"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                  @keyup="enableBtnSave"
                  @keypress="enableBtnSave"
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
                  v-model="editRow.nickname1_th"
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
                  v-model="editRow.nickname1_en"
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
                  v-model="editRow.nickname2_th"
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
                  v-model="editRow.nickname2_en"
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
                  v-model="editRow.postname_th"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  @keyup="enableBtnSave"
                  @keypress="enableBtnSave"
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
                  @keyup="enableBtnSave"
                  @keypress="enableBtnSave"
                  v-model="editRow.postname_en"
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
                  v-model="editRow.email"
                  :placeholder="
                    editRow.type_login == 0
                      ? $t('input_not_selected')
                      : $t('input_selected')
                  "
                  :disabled="enableInput"
                  @keypress="IsEmail"
                  @keyup="enableBtnSave"
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
                  v-model="editRow.cx"
                  :placeholder="$t('input_not_selected')"
                  :disabled="enableInput"
                  @keypress="isNumber"
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
                  v-model="editRow.phone"
                  :placeholder="$t('input_not_selected')"
                  :disabled="enableInput"
                  @keypress="isNumber"
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
                  <div>{{ $t('user.text7') }}</div>
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
                  <div>{{ $t('user.text8') }}</div>
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
                  v-model="editRow.username"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                  @keyup="enableBtnSave"
                  @keypress="enableBtnSave"
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
                  v-model="editRow.password"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  @keypress="IsPassword"
                  @keyup="enableBtnSave"
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
                  -- ไม่พบรายการ --
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
                  -- ไม่พบรายการ --
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
      masterEdit: {}
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
    }
  },
  methods: {
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
      this.enableBtnSave()
    },
    selectedType (value) {
      if (this.typeLogin !== value && this.editRow.mode == 'add') {
        this.searchEmpCode = ''
        this.typeLogin = value
        this.editRow = JSON.parse(JSON.stringify(this.master))
        this.editRow.emp_code = ''
        this.applist = []
        this.statusPermission = false
      }
      this.editRow.type_login = value
      this.enableBtnSave()
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
      this.enableBtnSave()
    },
    selectedUser (value) {
      this.empeDialog = false
      let mode = this.editRow.mode
      this.editRow = value
      this.editRow.mode = mode
      this.editRow.password = ''
      this.editRow.status = 1
      this.enableInput = false
      this.enableBtnSave()
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
          this.enableBtnSave()
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
      let str2 = JSON.stringify(this.editRow)
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
          (item.password !== this.oldPassword ||
            item.username !== this.oldUsername) &&
          this.editRow.mode == 'edit' &&
          item.password != this.defaultPassword
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
    enableBtnSave () {
      let item = this.editRow
      let group_id = item.group_id.toString()
      let name_th = item.name_th.trim()
      let name_en = item.name_en.trim()
      let postname_th = item.postname_th.trim()
      let postname_en = item.postname_en.trim()
      let emp_code = item.emp_code.toString()
      let email = item.email.trim()
      let password = ''
      if (item.password !== undefined) {
        password = item.password.trim()
      }

      if (
        group_id.length > 0 &&
        name_th.length > 0 &&
        name_en.length > 0 &&
        postname_th.length > 0 &&
        postname_en.length > 0 &&
        emp_code.trim().length > 0 &&
        // email.length > 0 &&
        this.applist.length > 0
      ) {
        if (item.type_login == 0) {
          if (password == this.defaultPassword) {
            this.enableBtn = false
          } else {
            let username = item.username.trim()
            let password = item.password.trim()
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
    save () {
      if (this.btnClick == 'save') {
        let result = JSON.parse(JSON.stringify(this.editRow))
        let arr = []
        var pwdCrypt = result.password
        if (result.password == this.defaultPassword) {
          pwdCrypt = this.oldPassword
        } else {
          if (result.password !== this.oldPassword) {
            pwdCrypt = bcrypt.hashSync(result.password, 10)
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
          if (this.InCondition(this.editRow.password)) {
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
    isNumber (evt) {
      this.enableBtnSave()
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57 || charCode == 46)) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    IsEmail (evt) {
      evt = evt ? evt : window.event
      var keyCode = evt.which ? evt.which : evt.keyCode
      if (
        keyCode == 45 ||
        keyCode == 46 ||
        keyCode == 95 ||
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 97 && keyCode <= 122) ||
        (keyCode >= 64 && keyCode <= 91)
      ) {
        this.enableBtnSave()
        return true
      } else {
        evt.preventDefault()
      }
    },
    IsPassword (evt) {
      this.enableBtnSave()
      evt = evt ? evt : window.event
      var keyCode = evt.which ? evt.which : evt.keyCode
      if (
        keyCode == 33 ||
        keyCode == 35 ||
        keyCode == 36 ||
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 97 && keyCode <= 122) ||
        (keyCode >= 64 && keyCode <= 91)
      ) {
        return true
      } else {
        evt.preventDefault()
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
          this.enableBtnSave()
        })
      })
    }
  },
  mounted () {}
}
</script>
