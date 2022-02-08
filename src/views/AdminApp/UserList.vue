<template>
  <div id="user-list" style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px;height: calc(100% - 10px);">
      <div class="detail-add">
        <div class="rows">
          <div style="width:20%" class="rows-name">ประเภทการเข้าใช้งานระบบ</div>
          <div
            :style="{
              width: !editRow.status_permission ? '62%' : '40%',
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
                <div style="padding-top:4px">LDAP (AD)</div>
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
                <div style="padding-top:4px">ผู้ใช้งานบนแอปพลิเคชัน</div>
              </div>
            </v-radio-group>
          </div>
          <div
            :style="{
              width: !editRow.status_permission ? '18%' : '40%',
              display: 'flex'
            }"
            class="rows-input"
          >
            <v-checkbox
              color="red"
              v-model="editRow.status_permission"
              hide-details
            ></v-checkbox>
            <div style="padding-top:4px">ผู้ดูแลระบบ</div>
            <div
              class="input-with-icon"
              v-show="editRow.status_permission"
              style="height:25px;margin-left:15px"
            >
              <v-select
                v-model="editRow.admin_menu"
                :items="items_menu"
                :placeholder="$t('input_selected')"
                item-text="name_th"
                item-value="menu_id"
                persistent-hint
                single-line
              >
              </v-select>
            </div>
          </div>
        </div>
        <div class="rows" v-show="editRow.type_login == 1">
          <div style="width:20%" class="rows-name">ค้นหาพนักงาน</div>
          <div style="width:80%;display:flex" class="rows-input">
            <div class="input-with-icon" style="width: 200px;">
              <div class="input-with-icon" style="width: 200px;">
                <input
                  type="text"
                  v-model="searchEmpCode"
                  :placeholder="'-- โปรดระบุรหัสพนักงาน --'"
                  maxlength="250"
                  v-on:keyup.enter="onEnter"
                />
              </div>
              <!-- <v-combobox
                id="combobox-user-list"
                v-model="editRow.emp_code"
                dense
                filled
                hide-selected
                outlined
                solo
                :placeholder="$t('input_selected')"
              ></v-combobox> -->
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
          <div style="width:20%" class="rows-name">รหัสพนักงาน</div>
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
            <div style="width:40%" class="rows-name">ชื่อ - นามสกุล (TH)</div>
            <div style="width:60%" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.name_th"
                  :placeholder="$t('input_selected')"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
                  :placeholder="'-- หากมีโปรดระบุ --'"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
                  :placeholder="'-- หากมีโปรดระบุ --'"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
                  :placeholder="'-- หากมีโปรดระบุ --'"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
                  :placeholder="'-- หากมีโปรดระบุ --'"
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
                  :disabled="enableInput"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
                  :disabled="enableInput"
                  @keypress="IsEmail"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
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
                  v-model="editRow.cx"
                  :placeholder="'-- หากมีโปรดระบุ --'"
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
            <div style="width:40%" class="rows-name">เบอร์โทร</div>
            <div style="width:60%" class="rows-input">
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="editRow.phone"
                  :placeholder="'-- หากมีโปรดระบุ --'"
                  :disabled="enableInput"
                  @keypress="isNumber"
                  :style="{ background: enableInput ? '#D1D1D1' : '' }"
                />
              </div>
              <div style="color:#CE1212;font-size:8px;padding-top:5px">
                * หากระบุข้อมูลดังกล่าวจะเป็นสาธารณะ
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
                    @click="selectedStatus(1)"
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
                    @click="selectedStatus(0)"
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
        <div class="rows" v-show="editRow.type_login == 0">
          <div style="width:50%;display: flex;">
            <div style="width:40%" class="rows-name">ชื่อผู้ใช้งาน</div>
            <div style="width:60%;display:flex" class="rows-input">
              <div class="input-with-icon" style="margin-right:10px">
                <input
                  type="text"
                  v-model="editRow.username"
                  :placeholder="'-- หากมีโปรดระบุ --'"
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
                  >ชื่อผู้ใช้งานต้องยาวอย่างน้อย 6 ตัวอักษรประกอบไปด้วย<br />
                  ตัวเลขหรือตัวอักษรภาษาอังกฤษ ตัวพิมพ์เล็กหรือพิมพ์<br />ใหญ่</span
                >
              </v-tooltip>
            </div>
          </div>
          <div style="width:50%;;display: flex;">
            <div style="width:40%" class="rows-name">
              รหัสผ่าน
            </div>
            <div
              style="width:60%;padding-right:25px;display:flex;"
              class="rows-input"
            >
              <div class="input-with-icon" style="margin-right:10px">
                <input
                  type="text"
                  v-model="editRow.password"
                  :placeholder="'-- หากมีโปรดระบุ --'"
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
                  >รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษรและประกอบไปด้วย<br />
                  1) ตัวเลข 0 - 9<br />
                  2) ตัวอักษรภาษาอังกฤษตัวพิมพ์เล็กหรือพิมพ์ใหญ่</span
                >
              </v-tooltip>
            </div>
          </div>
        </div>
        <div class="rows" style="margin-top:8px">
          <div style="width:20%" class="rows-name">
            กลุ่มผู้ใช้งานแอปพลิเคชัน
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
                item-text="name_th"
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
                  @click="sort(headCol[0], 0)"
                >
                  <div class="column-name">{{ $t('set.list_col1') }}</div>
                  <v-icon
                    v-text="sortNo == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="20"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:30%"
                  @click="sort(headCol[1], 1)"
                >
                  <div class="column-name">
                    {{ 'แอปพิเคชัน' }}
                  </div>
                  <v-icon
                    v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
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
                    {{ 'การเข้าใช้งานระบบ' }}
                  </div>
                  <v-icon
                    v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
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
                    {{ item.name_th }}
                  </div>
                  <div
                    class="body"
                    style="width:60%;padding-top:5px;display:flex"
                  >
                    <div>
                      {{ item.type_login ? 'LDAP (AD)' : 'Username : ' }}
                    </div>
                    <div
                      v-show="item.type_login == 0"
                      class="input-with-icon"
                      style="margin-left:15px"
                    >
                      <input
                        type="text"
                        v-model="item.username"
                        :placeholder="'-- หากมีโปรดระบุ --'"
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
        <v-btn
          @click="saveBtn()"
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
              <div class="right-action justify-end" style="width:20%;"></div>
            </div>
            <div class="table">
              <div class="head-table">
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
                  style="width:20%"
                  @click="sort(headCol[1], 1)"
                >
                  <div class="column-name">รหัสพนักงาน</div>
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
                    ชื่อ - นามสกุล
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
                    ตำแหน่ง
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
              <div class="body-table">
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
                    {{ item.name_th }}
                  </div>
                  <div class="body" style="width:30%;padding-top:5px">
                    {{ item.postname_th }}
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
      empeDialog: false,
      sortNo: null,
      headCol: ['index', 'emp_code', 'name_th', 'postname_th'],
      sortNo2: null,
      headCol2: ['index', 'emp_code', 'username'],
      mainSort: {
        feild: 'emp_code',
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
          menu_id: 0
        },
        {
          name_th: 'ทั้งหมด',
          menu_id: 1
        }
      ]
    }
  },
  computed: {},
  watch: {
    searchApp: {
      handler: function (todos) {
        if (todos.trim().length > 2 || todos.trim().length == 0) {
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
                this.list = []
              }
            })
        }
      }
    }
  },
  methods: {
    selectedType (value) {
      this.editRow.type_login = value
      if (value == 0) {
        this.enableInput = false
      } else if (value == 1 && this.editRow.user_id !== null) {
        this.enableInput = true
      } else {
        this.enableInput = true
      }
    },
    selectedStatus (value) {
      this.editRow.status = value
    },
    selectedUser (value) {
      this.empeDialog = false
      let mode = this.editRow.mode
      this.editRow = value
      this.editRow.mode = mode
      this.editRow.status = 1
      this.enableInput = false
    },
    selectedGroup (value) {
      if (this.editRow.user_id !== null) {
        let req = {
          group_id: value,
          user_id: this.editRow.user_id.trim() == 0 ? 0 : this.editRow.user_id
        }
        this.$store.dispatch('getDroupdownGroup', req).then(res => {
          let temp = []
          for (let i = 0; i < res.data.app.length; i++) {
            res.data.app[i].index = i
            let username =
              res.data.app[i].username == null ? '' : res.data.app[i].username
            if (this.editRow.mode == 'add' && username.trim().length == 0) {
              res.data.app[i].username = this.editRow.username
            }
            temp.push(res.data.app[i])
          }
          this.applist = temp
        })
      }
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
    onEnter () {
      let req = {
        emp_code: this.searchEmpCode.trim()
      }
      let mode = this.editRow.mode
      this.$store
        .dispatch('searchEmpLdap', req)
        .then(res => {
          if (res.data.length == 1) {
            this.enableInput = false
            this.editRow = res.data[0]
            this.editRow.mode = mode
            this.editRow.status = 1
          } else if (res.data.length > 1) {
            this.empeDialog = true
            this.list = res.data
          }
        })
        .catch(error => {
          if (error && error.response && error.response.status === 500) {
            this.list = []
          }
        })
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
            }
          })
      }
    },
    CloseDialogs () {
      this.empeDialog = false
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
    saveBtn () {
      let result = this.editRow
      let arr = []
      result.password =
        this.editRow.type_login == 1 ? 'LDAP' : this.editRow.password
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
      result.app = arr
      if (this.editRow.type_login == 1) {
        console.log('save user ==>', JSON.stringify(result))
      } else {
        if (this.InCondition(this.editRow.password)) {
          console.log('save user ==>', JSON.stringify(result))
        } else {
          console.log('No save...')
        }
      }
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
    InCondition (value) {
      if (value.length >= 6) {
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
        return true
      } else {
        evt.preventDefault()
      }
    },
    IsPassword (evt) {
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
    onButtonClick () {}
  },
  created () {
    if (this.editRow.mode == 'add') {
      this.enableInput = true
      let req = {
        keyword: '',
        field: 'name_th',
        sort: 'asc'
      }
      this.$store.dispatch('getGroupList', req).then(res => {
        this.items = res.data
        this.applist = []
      })
    } else {
      this.enableInput = false
      let req = {
        group_id: this.editRow.group_id,
        user_id: this.editRow.user_id
      }
      this.$store.dispatch('getDroupdownGroup', req).then(res => {
        this.items = [res.data]
        let temp = []
        for (let i = 0; i < res.data.app.length; i++) {
          res.data.app[i].index = i
          temp.push(res.data.app[i])
        }
        this.applist = temp
      })
    }
  },
  mounted () {}
}
</script>
