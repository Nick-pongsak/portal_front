<template>
  <div style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px;height: calc(100% - 10px);">
      <div class="detail-add">
        <div class="rows">
          <div style="width:30%" class="rows-name">{{ $t('app.text3') }}</div>
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
          <div style="width:30%" class="rows-name">{{ $t('app.text4') }}</div>
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
            {{ $t('app.text5') }}
          </div>
          <div style="width:70%;padding-right:25px" class="rows-input">
            <div class="input-with-icon" style="width: 100%">
              <textarea
                @keyup="enableBtnSave"
                @keypress="enableBtnSave"
                v-model="editRow.description_th"
                :placeholder="$t('input_selected')"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">
            {{ $t('app.text6') }}
          </div>
          <div style="width:70%;padding-right:25px" class="rows-input">
            <div class="input-with-icon" style="width: 100%">
              <textarea
                v-model="editRow.description_en"
                :placeholder="$t('input_selected')"
                @keyup="enableBtnSave"
                @keypress="enableBtnSave"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">{{ $t('app.text1') }}</div>
          <div style="width:70%;display:flex" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <v-select
                v-model="editRow.category_id"
                :items="items"
                :placeholder="$t('input_selected')"
                item-text="name_th"
                item-value="category_id"
                persistent-hint
                single-line
              ></v-select>
              <!-- return-object -->
            </div>
            <v-btn
              @click="openPopupType()"
              class="cancel-btn"
              style="height:25px;width:32px;min-width:32px;margin-left:8px"
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
          <div style="width:30%" class="rows-name">{{ $t('app.text7') }}</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="editRow.key_app"
                :placeholder="$t('input_selected')"
                maxlength="50"
                @keypress="IsNumber"
                @keyup="IsNumberUp"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">
            {{ $t('profile.account_2') }}
          </div>
          <div style="width:70%" class="rows-input">
            <v-radio-group v-model="editRow.type_login" style="display:flex">
              <div class="radio" style="margin-right: 65px;">
                <v-radio
                  :color="'#CE1212'"
                  :value="1"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
                <div>{{ $t('master.type_login_0') }}</div>
              </div>
              <div class="radio">
                <v-radio
                  :color="'#CE1212'"
                  :value="0"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
                <div>{{ $t('app.text20') }}</div>
              </div>
            </v-radio-group>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">{{ $t('app.text8') }}</div>
          <div style="width:70%" class="rows-input">
            <v-radio-group v-model="editRow.status_sso" style="display:flex">
              <div class="radio">
                <v-radio
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
        <div class="rows">
          <div style="width:30%" class="rows-name">{{ $t('app.text9') }}</div>
          <div style="width:70%" class="rows-input">
            <v-radio-group v-model="editRow.status" style="display:flex">
              <div class="radio">
                <v-radio
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
        <div class="rows">
          <div style="width:30%" class="rows-name">{{ $t('app.text10') }}</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 544px;">
              <input
                type="text"
                v-model="editRow.url"
                :placeholder="$t('input_selected')"
                maxlength="250"
                @keyup="enableBtnSave"
                @keypress="enableBtnSave"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%;align-items: start;" class="rows-name">
            {{ $t('app.text11') }}
          </div>
          <div style="width:70%" class="rows-input">
            <!-- :loading="isSelecting" -->
            <v-btn
              class="cancel-btn"
              :style="{
                width: '200px',
                'margin-top': '5px',
                'margin-bottom': dialog_profile ? '20px' : ''
              }"
              @click="onButtonClick"
            >
              {{ $t('btn_upload') }}
            </v-btn>
            <div class="upload-block" v-if="!dialog_profile">
              <image-uploader
                v-model="editRow.image"
                :preview="true"
                :maxHeight="768"
                :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                capture="environment"
                :debug="1"
                accept="image/jpeg"
                :autoRotate="true"
                outputFormat="blob"
                @input="setImage"
              >
                <label
                  for="fileInput"
                  slot="upload-label"
                  ref="uploader"
                  style="visibility: hidden;"
                >
                  {{ hasImage ? 'Replace' : 'Click to upload' }}
                </label>
              </image-uploader>
            </div>
            <div
              class="pic-upload"
              v-if="editRow.image == '' && editRow.mode == 'add' && !hasImage"
            >
              240*180
            </div>
            <div
              v-else-if="
                editRow.image !== '' && editRow.mode == 'edit' && !hasImage
              "
            >
              <v-img max-height="180" max-width="240" :src="editRow.image">
              </v-img>
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

    <v-dialog v-model="typeDialog" :max-width="editMode ? '600' : '750'">
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
            {{ renderTitle() }}
          </div>
          <div class="line-page" style="margin-top:8px"></div>
          <div v-if="editMode">
            <div class="rows-form" style="padding-top:30px">
              <div class="rows-title" style="margin-right:70px">
                {{ $t('app.text13') }}
              </div>
              <div class="input-with-icon">
                <input
                  style="width:100%"
                  type="text"
                  v-model="NameThInput"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
            <div class="rows-form" style="margin-top:30px">
              <div class="rows-title" style="margin-right:70px">
                {{ $t('app.text14') }}
              </div>
              <div class="input-with-icon">
                <input
                  style="width:100%"
                  type="text"
                  v-model="NameEnInput"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
            <div
              style="padding-top:50px;padding-bottom:50px;display:flex"
              class="justify-center"
            >
              <v-btn
                @click="CloseNewType()"
                class="ok-btn"
                style="margin-right:30px;"
              >
                {{ $t('btn_cancel') }}
              </v-btn>
              <v-btn
                @click="SaveNewType()"
                :disabled="enableType"
                class="cancel-btn"
                :style="{
                  background: enableType ? '#CE1212' : '',
                  opacity: enableType ? '0.51' : ''
                }"
              >
                {{ $t('btn_save') }}
              </v-btn>
            </div>
          </div>
          <div v-else style="width:100%;margin-top:15px">
            <div style="display:flex;width:100%">
              <div style="width:80%">
                <div class="input-with-icon search-form">
                  <v-icon v-text="'mdi-magnify'" size="20"></v-icon>
                  <input
                    style="width:100%"
                    type="text"
                    v-model="searchApp"
                    :placeholder="$t('input_search')"
                    maxlength="250"
                  />
                </div>
              </div>
              <div class="right-action justify-end" style="width:20%;">
                <v-btn @click="AddNewType()" class="cancel-btn">
                  <v-icon
                    v-text="'mdi-plus'"
                    style="color:#ffffff;margin-right:5px;"
                    size="22"
                  ></v-icon>
                  {{ $t('btn_add') }}
                </v-btn>
              </div>
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
                  style="width:40%"
                  @click="sort(headCol[1], 1)"
                >
                  <div class="column-name">{{ $t('app.text13') }}</div>
                  <v-icon
                    v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
                    style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
                    size="22"
                  ></v-icon>
                </div>
                <div
                  class="head"
                  style="width:40%"
                  @click="sort(headCol[2], 2)"
                >
                  <div class="column-name">
                    {{ $t('app.text14') }}
                  </div>
                  <v-icon
                    v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
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
                <div v-if="items.length == 0" class="no-data">
                  -- ไม่พบรายการ --
                </div>
                <div
                  class="body-row"
                  v-for="(item, index) in items"
                  :key="'setapp' + index"
                >
                  <div
                    class="body"
                    style="width:10%;padding-left:5px;padding-top:5px"
                  >
                    {{ item.index + 1 }}
                  </div>
                  <div class="body" style="width:40%;padding-top:5px">
                    {{ item.name_th }}
                  </div>
                  <div class="body" style="width:40%;padding-top:5px">
                    {{ item.name_en }}
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
import ImageUploader from 'vue-image-upload-resize'
export default {
  name: 'add-app',
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
      items: [],
      enableBtn: false,
      selectedFile: null,
      dialog: false,
      errorDialog: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?',
      error: false,
      rightBtn: 'บันทึก',
      typeDialog: false,
      searchApp: '',
      sortNo: null,
      headCol: ['index', 'name_th', 'name_en'],
      editMode: false,
      NameThInput: '',
      NameEnInput: '',
      enableType: true,
      hasImage: false,
      editRow: this.data,
      mainSort: {
        feild: 'name_th',
        orderby: true
      },
      modeAdd: null,
      editRowPop: {},
      btnClick: null,
      detailDialog: null,
      enableBtn: true,
      file: '',
      masterEdit: {}
    }
  },
  computed: {
    dialog_profile () {
      return this.$store.getters.dialog_profile
    }
  },
  watch: {
    searchApp: {
      handler: function (todos) {
        if (todos.trim().length > 1 || todos.trim().length == 0) {
          this.getTypeList()
        }
      }
    },
    NameThInput (todos) {
      if (todos.trim().length > 0 && this.NameEnInput.trim().length > 0) {
        this.enableType = false
      } else {
        this.enableType = true
      }
    },
    NameEnInput (todos) {
      if (todos.trim().length > 0 && this.NameThInput.trim().length > 0) {
        this.enableType = false
      } else {
        this.enableType = true
      }
    }
  },
  methods: {
    renderTitle () {
      let mode = ''
      if (this.$i18n.locale == 'en') {
        mode = this.modeAdd ? 'Add Category' : 'Edit Category'
      } else {
        mode = this.modeAdd ? this.$t('app.text15') : this.$t('app.text18')
      }
      return this.editMode ? mode : this.$t('app.text12')
    },
    setImage: function (output) {
      this.hasImage = true
      this.file = output
      this.editRow.image = 'output'
      this.enableBtnSave()
    },
    AddNewType () {
      this.modeAdd = true
      this.editMode = true
      this.NameThInput = ''
      this.NameEnInput = ''
    },
    EditNewType (item) {
      this.enableType = true
      this.editMode = true
      this.modeAdd = false
      this.editRowPop = item
      this.NameThInput = item.name_th
      this.NameEnInput = item.name_en
      this.btnClick = 'edit-type'
      this.detailDialog = item
    },
    SaveNewType (item) {
      let name_th = this.NameThInput.trim()
      let name_en = this.NameEnInput.trim()
      if (name_th.length > 0 && name_en.length > 0) {
        this.btnClick = 'save-type'
        this.dialog = true
        this.errorDialog = 'คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?'
        this.rightBtn = 'บันทึก'
        this.detailDialog = item
      }
    },
    DeleteNewType (item) {
      this.btnClick = 'del-type'
      this.dialog = true
      this.errorDialog = 'คุณต้องการลบข้อมูลใช่หรือไม่ ?'
      this.rightBtn = 'ลบ'
      this.detailDialog = item
    },
    CloseNewType () {
      this.modeAdd = null
      this.editMode = false
      this.NameThInput = ''
      this.NameEnInput = ''
    },
    sort (feild, index) {
      this.sortNo = this.sortNo == index ? null : index
      if (feild == 'index') {
        if (this.mainSort.orderby) {
          this.items = this.items.sort(function (a, b) {
            return b.index - a.index
          })
        } else {
          this.items = this.items.sort(function (a, b) {
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
        this.getTypeList()
      }
    },
    openPopupType () {
      this.typeDialog = true
    },
    CloseDialogs () {
      this.typeDialog = false
      this.editMode = false
      this.NameThInput = ''
      this.NameEnInput = ''
      this.searchApp = ''
    },
    cancelBtn () {
      let str1 = this.masterEdit
      let str2 = JSON.stringify(this.editRow)
      if (str1 == str2) {
        this.cancel()
      } else {
        this.btnClick = 'cancel'
        this.dialog = true
        this.errorDialog = 'คุณต้องการยกเลิกการดำเนินการใช่หรือไม่ ?'
        this.rightBtn = 'ตกลง'
      }
    },
    cancel () {
      if (!this.dialog) {
        this.$emit('cancel', null)
      }
      this.dialog = false
      this.rightBtn = 'บันทึก'
      this.selectedFile = null
      this.detailDialog = null
    },
    clearBtn () {
      this.btnClick = 'clear'
      this.dialog = true
      this.errorDialog = 'คุณต้องการลบข้อมูลใช่หรือไม่ ?'
      this.rightBtn = 'ลบ'
    },
    clear () {
      let result = {
        app_id: this.editRow.app_id,
        name_th: this.editRow.name_th,
        name_en: this.editRow.name_en,
        confirm: this.btnClick == 'clear' ? 0 : 1
      }
      this.$store
        .dispatch('deleteAppList', result)
        .then(res => {
          if (res.data.success == undefined) {
            if (res.status == 215) {
              this.btnClick = 'confirm-clear'
              this.dialog = true
              this.errorDialog =
                'ข้อมูลแอปพลิเคชันดังกล่าวถูกใช้งานอยู่ในเมนู "จัดกลุ่มผู้ใช้ งานแอปพลิเคชัน" กรุณายืนยันการดำเนินการ'
              this.rightBtn = 'ยืนยัน'
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
      let description_th = item.description_th.trim()
      let description_en = item.description_en.trim()
      let category_id = item.category_id.toString()
      let key_app = item.key_app.trim()
      let image = item.image.trim()
      let url = item.url.trim()
      if (
        name_th.length > 0 &&
        name_en.length > 0 &&
        description_th.length > 0 &&
        description_en.length > 0 &&
        category_id.length > 0 &&
        key_app.length > 0 &&
        image.length > 0 &&
        url.length > 0
      ) {
        this.enableBtn = false
      } else {
        this.enableBtn = true
      }
    },
    save () {
      if (this.btnClick == 'save') {
        let url = this.editRow.mode == 'add' ? 'addAppList' : 'updateAppList'
        let formData = new FormData()
        if (this.editRow.mode == 'edit') {
          formData.append('app_id', this.editRow.app_id)
        }
        if (this.editRow.image == 'output') {
          formData.append('image', this.file)
        } else {
          formData.append('image', '')
        }
        formData.append('category_id', this.editRow.category_id)
        formData.append('description_en', this.editRow.description_en)
        formData.append('description_th', this.editRow.description_th)
        formData.append('key_app', this.editRow.key_app)
        formData.append('name_en', this.editRow.name_en)
        formData.append('name_th', this.editRow.name_th)
        formData.append('status', this.editRow.status)
        formData.append('status_sso', this.editRow.status_sso)
        formData.append('type_login', this.editRow.type_login)
        formData.append('url', this.editRow.url)

        this.$store.dispatch(url, formData).then(res => {
          this.$emit('save', null)
          this.dialog = false
        })
      } else if (this.btnClick == 'clear' || this.btnClick == 'confirm-clear') {
        this.clear()
      } else if (this.btnClick == 'save-type' || this.btnClick == 'edit-type') {
        let result = {
          name_th: this.NameThInput,
          name_en: this.NameEnInput
        }
        if (!this.modeAdd) {
          result = {
            category_id: this.editRowPop.category_id,
            name_th: this.NameThInput,
            name_en: this.NameEnInput
          }
        }
        let url = this.modeAdd ? 'addType' : 'updateType'
        this.$store.dispatch(url, result).then(res => {
          if (res.data.success == undefined) {
            if (res.status == 217) {
              {
                this.btnClick = 'error'
                this.dialog = true
                this.error = true
                this.errorDialog =
                  'ไม่สามารถบันทึกข้อมูลได้ โปรดติดต่อผู้ดูแลระบบ (Error Code ' +
                  res.status +
                  ')'
              }
            } else {
              this.modeAdd = null
              this.editMode = false
              this.dialog = false
              this.detailDialog = null
              this.getTypeList()
            }
          } else {
            this.modeAdd = null
            this.editMode = false
            this.dialog = false
            this.detailDialog = null
            this.getTypeList()
          }
        })
      } else if (this.btnClick == 'del-type') {
        this.$store.dispatch('deleteType', this.detailDialog).then(res => {
          this.dialog = false
          this.detailDialog = null
          this.getTypeList()
        })
      } else if (this.btnClick == 'cancel') {
        this.dialog = false
        this.rightBtn = 'บันทึก'
        this.selectedFile = null
        this.detailDialog = null
        this.$emit('cancel', null)
      } else {
        this.dialog = false
      }
    },
    onButtonClick () {
      this.$refs.uploader.click()
    },
    getTypeList () {
      let req = {
        keyword: this.searchApp.trim(),
        field: this.mainSort.feild,
        sort: this.mainSort.orderby ? 'asc' : 'desc'
      }
      this.$store.dispatch('getType', req).then(res => {
        this.items = res.data
      })
    },
    IsNumber (evt) {
      this.enableBtnSave()
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
    IsNumberUp (evt) {
      let value = evt.target.value
      let thai = /[ก-ฮ]/g
      let numThai = /[๑-๙]/g
      let charac = /[-_=.%฿~`:;'"!><@#^&{}/|+()[\]*\\$]/g
      // let charac = /[=%฿.-_$~`:;'"!><@#^&{}/|+()[\]*\\]/g
      let rsChar = value.search(thai)
      let rsNum = value.search(numThai)
      let rsCharac = value.search(charac)
      if (rsChar >= 0 || rsNum >= 0 || rsCharac >= 0) {
        this.editRow.key_app = ''
        this.enableBtnSave()
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
    this.masterEdit = JSON.stringify(this.editRow)
    if (this.editRow.mode == 'edit') {
      this.file = this.editRow.image
      this.enableBtnSave()
    }
    this.getTypeList()
  },
  components: {
    ImageUploader
  },
  mounted () {}
}
</script>
