<template>
  <div style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px">
      <div class="detail-add">
        <div class="rows">
          <div style="width:30%" class="rows-name">ชื่อแอปพลิเคชัน (TH)</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <input
                type="text"
                v-model="app_name_th"
                :placeholder="'-- โปรดระบุ --'"
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
                v-model="app_name_en"
                :placeholder="'-- โปรดระบุ --'"
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
                v-model="app_desc_th"
                :placeholder="'-- โปรดระบุ --'"
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
                v-model="app_desc_en"
                :placeholder="'-- โปรดระบุ --'"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">หมวดหมู่</div>
          <div style="width:70%;display:flex" class="rows-input">
            <div class="input-with-icon" style="width: 365px;">
              <v-select
                v-model="app_type"
                :items="items"
                :placeholder="'-- โปรดระบุ --'"
                item-text="state"
                item-value="abbr"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </div>
            <v-btn
              @click="add()"
              class="cancel-btn"
              style="height:32px;width:32px;margin-left:8px"
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
                v-model="app_code"
                :placeholder="'-- โปรดระบุ --'"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">ประเภทการเข้าใช้งานระบบ</div>
          <div style="width:70%" class="rows-input">
            <v-radio-group v-model="type_access" style="display:flex">
              <div class="radio" style="margin-right: 65px;">
                <v-radio
                  :color="'#CE1212'"
                  :value="'1'"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
                <div>LDAP (AD)</div>
              </div>
              <div class="radio">
                <v-radio
                  :color="'#CE1212'"
                  :value="'2'"
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
            <v-radio-group v-model="connect_sso" style="display:flex">
              <div class="radio">
                <v-radio
                  :color="'#CE1212'"
                  :value="'1'"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
                <div>เปิดใช้งาน</div>
              </div>
              <div class="radio">
                <v-radio
                  :color="'#CE1212'"
                  :value="'2'"
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
            <v-radio-group v-model="app_status" style="display:flex">
              <div class="radio">
                <v-radio
                  :color="'#CE1212'"
                  :value="'1'"
                  :ripple="false"
                  :messages="false"
                  :light="false"
                ></v-radio>
                <div>เปิดใช้งาน</div>
              </div>
              <div class="radio">
                <v-radio
                  :color="'#CE1212'"
                  :value="'2'"
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
                v-model="url_app"
                :placeholder="'-- โปรดระบุ --'"
              />
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">รูปแบนเนอร์</div>
          <div style="width:70%" class="rows-input">
            <v-btn
              class="cancel-btn"
              style="width:200px"
              @click="onButtonClick"
            >
              <!-- :loading="isSelecting" -->
              {{ $t('btn_upload') }}
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="image/*"
              @change="onFileChanged"
            />
            <div class="pic-upload" v-if="selectedFile == null">
             240*180
            </div>
            <div v-else class="pic-upload-success">
              <v-img
                max-height="180"
                max-width="240"
                :src="'https://cdn.vuetifyjs.com/images/cards/cooking.png'"
              >
              </v-img>
            </div>
          </div>
        </div>
      </div>
    </v-card>
    <div style="display:flex;padding-top:27px" class="justify-end">
      <v-btn
        @click="cancel()"
        class="ok-btn"
        style="width:200px;margin-right:6px;height: 22px;"
      >
        {{ $t('btn_cancel') }}
      </v-btn>
      <!-- @click="save()" -->
      <v-btn
        @click.stop="dialog = true"
        :class="enableBtn ? 'cancel-btn disabled' : 'cancel-btn'"
        style="width:200px;height: 22px"
      >
        {{ $t('btn_save') }}
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="340">
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
            {{ error ? 'ปิด' : 'บันทึก' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'add-system-user',
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      app_name_th: '',
      app_name_en: '',
      app_desc_th: '',
      app_desc_en: '',
      app_type: '',
      app_code: '',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      type_access: '1',
      connect_sso: '1',
      app_status: '1',
      url_app: '',
      enableBtn: false,
      // isSelecting: false,
      selectedFile: null,
      dialog: false,
      errorDialog: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?',
      error: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    cancel () {
      this.dialog = false
      this.selectedFile = null
      this.$emit('cancel', null)
    },
    save () {
      if (this.error) {
        this.dialog = false
      } else {
        // this.error = true
        // this.errorDialog =
        //   'ไม่สามารถบันทึกข้อมูลได้ โปรดติดต่อผู้ดูแลระบบ (Error Code 1001)'

        this.dialog = false
        this.selectedFile = null
        this.$emit('save', null)
      }
    },
    onButtonClick () {
      // this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          // this.isSelecting = false
        },
        { once: true }
      )

      this.$refs.uploader.click()
    },
    onFileChanged (e) {
      this.selectedFile = e.target.files[0]
      setTimeout(() => {
        // console.log(e.target.files[0].name)
      }, 2000)

      // do something
    }
  },
  mounted () {}
}
</script>
