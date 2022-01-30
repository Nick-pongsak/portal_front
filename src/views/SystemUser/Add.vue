<template>
  <div style="height:calc(100% - 50px);">
    <v-card style="padding:50px 5px 53px 42px">
      <div class="detail-add">
        <div class="rows">
          <div style="width:30%" class="rows-name">ชื่อแอปพลิเคชัน (TH)</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 300px;">
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
            <div class="input-with-icon" style="width: 300px;">
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
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 500px;">
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
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 500px;">
              <textarea
                v-model="app_desc_en"
                :placeholder="'-- โปรดระบุ --'"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">หมวดหมู่</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 300px;">
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
          </div>
        </div>
        <div class="rows">
          <div style="width:30%" class="rows-name">รหัสแอปพลิเคชัน</div>
          <div style="width:70%" class="rows-input">
            <div class="input-with-icon" style="width: 300px;">
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
            <div class="input-with-icon" style="width: 500px;">
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
            <v-btn @click="upload()" class="cancel-btn" style="width:200px">
              {{ 'อัปโหลด' }}
            </v-btn>
            <div class="pic-upload">
              420*260
            </div>
          </div>
        </div>
      </div>
    </v-card>
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
      url_app: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    upload () {}
  },
  mounted () {}
}
</script>
