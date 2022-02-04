<template>
  <div style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px;height: calc(100% - 10px);">
      <div class="detail-add">
        <div class="rows">
          <div style="width:30%" class="rows-name">ชื่อแอปพลิเคชัน (TH)</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="editRow.name_th"
                :placeholder="$t('input_selected')"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">ชื่อแอปพลิเคชัน (EN)</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="editRow.name_en"
                :placeholder="$t('input_selected')"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">
            คำอธิบายแอปพลิเคชั่น (TH)
          </div>
          <div style="width:70%;padding-right:25px" class="rows-input">
            <div class="input-with-icon" style="width: 100%">
              <textarea
                v-model="editRow.description_th"
                :placeholder="$t('input_selected')"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">
            คำอธิบายแอปพลิเคชั่น (EN)
          </div>
          <div style="width:70%;padding-right:25px" class="rows-input">
            <div class="input-with-icon" style="width: 100%">
              <textarea
                v-model="editRow.description_en"
                :placeholder="$t('input_selected')"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">หมวดหมู่</div>
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
          <div style="width:30%" class="rows-name">รหัสแอปพลิเคชัน</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="editRow.key_app"
                :placeholder="$t('input_selected')"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">ประเภทการเข้าใช้งานระบบ</div>
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
                <div>ผู้ใช้งานภายในระบบ</div>
              </div>
            </v-radio-group>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">สถานะการเชื่อมต่อ SSO</div>
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
        <div class="rows">
          <div style="width:30%" class="rows-name">สถานะแอปพลิเคชัน</div>
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
        <div class="rows">
          <div style="width:30%" class="rows-name">URL ระบบ</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 544px;">
              <input
                type="text"
                v-model="editRow.url"
                :placeholder="$t('input_selected')"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">รูปแบนเนอร์</div>
          <div style="width:70%" class="rows-input">
            <!-- :loading="isSelecting" -->
            <v-btn
              class="cancel-btn"
              style="width:200px;margin-top:5px"
              @click="onButtonClick"
            >
              {{ $t('btn_upload') }}
            </v-btn>
            <div class="upload-block">
              <image-uploader
                :preview="true"
                :maxHeight="768"
                :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                capture="environment"
                :debug="1"
                accept="image/*"
                :autoRotate="true"
                outputFormat="verbose"
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
            <div class="pic-upload" v-if="image == null">
              240*180
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
        <!-- @click.stop="dialog = true" -->
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
            {{
              editMode
                ? 'เพิ่มหมวดหมู่ของแอปพลิเคชัน'
                : 'การจัดการหมวดหมู่ของแอปพลิเคชัน'
            }}
          </div>
          <div class="line-page" style="margin-top:8px"></div>
          <div v-if="editMode">
            <div class="rows-form" style="padding-top:30px">
              <div class="rows-title" style="margin-right:70px">
                {{ 'หมวดหมู่ (TH)' }}
              </div>
              <div class="input-with-icon">
                <input
                  type="text"
                  v-model="NameThInput"
                  :placeholder="$t('input_selected')"
                />
              </div>
            </div>
            <div class="rows-form" style="margin-top:30px">
              <div class="rows-title" style="margin-right:70px">
                {{ 'หมวดหมู่ (EN)' }}
              </div>
              <div class="input-with-icon">
                <input
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
                :class="enableType ? 'cancel-btn-disabled' : 'cancel-btn'"
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
                    type="text"
                    v-model="searchApp"
                    :placeholder="$t('input_search')"
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
                  <div class="column-name">No</div>
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
                  <div class="column-name">หมวดหมู่ (TH)</div>
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
                    หมวดหมู่ (EN)
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
                <div v-if="items.list2 == 0" class="no-data">
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
      enableType: false,
      hasImage: false,
      image: null,
      editRow: this.data,
      mainSort: {
        feild: 'name_th',
        orderby: true
      },
      modeAdd: null,
      editRowPop: {}
    }
  },
  computed: {},
  watch: {
    searchApp: {
      handler: function (todos) {
        if (todos.trim().length > 2 || todos.trim().length == 0) {
          this.getTypeList()
        }
      }
    }
  },
  methods: {
    setImage: function (output) {
      this.hasImage = true
      this.image = output
      // console.log('Info', output)
      // console.log('Info', output.info)
      // console.log('Exif', output.exif)
    },
    AddNewType () {
      this.modeAdd = true
      this.editMode = true
    },
    EditNewType (item) {
      this.editMode = true
      this.modeAdd = false
      this.editRowPop = item
      this.NameThInput = item.name_th
      this.NameEnInput = item.name_en
    },
    SaveNewType (item) {
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
        this.modeAdd = null
        this.editMode = false
        this.getTypeList()
      })
    },
    DeleteNewType (item) {
      this.$store.dispatch('deleteType', item).then(res => {
        this.getTypeList()
      })
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
    },
    cancel () {
      if (!this.dialog) {
        this.$emit('cancel', null)
      }
      this.dialog = false
      this.rightBtn = 'บันทึก'
      this.selectedFile = null
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
      this.dialog = true
      this.rightBtn = 'บันทึก'
    },
    save () {
      // if (this.error) {
      //   this.dialog = false
      // } else {
      //   // this.error = true
      //   // this.errorDialog =
      //   //   'ไม่สามารถบันทึกข้อมูลได้ โปรดติดต่อผู้ดูแลระบบ (Error Code 1001)'

      //   // this.error = true
      //   // this.errorDialog =
      //   //   'ข้อมูลแอปพลิเคชันดังกล่าวถูกใช้งานอยู่ในเมนู "จัดกลุ่มผู้ใช้งานแอปพลิเคชัน" กรุณายืนยัน การดำเนินการ'

      //   this.selectedFile = null

      let url = this.editRow.mode == 'add' ? 'addAppList' : 'updateAppList'

      this.$store.dispatch(url, this.editRow).then(res => {
        this.dialog = false
        // this.items = res.data
      })

      this.$emit('save', null)
      // }
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
    }
  },
  created () {
    this.getTypeList('open')
  },
  components: {
    ImageUploader
  },
  mounted () {}
}
</script>
