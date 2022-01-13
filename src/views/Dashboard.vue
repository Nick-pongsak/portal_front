<template>
  <div id="dashboard">
    <modal />
    <!-- <v-container class="grey lighten-5"> -->
    <div class="name-page">
      Product Manager (IT) Services
      <div class="line-page"></div>
    </div>
    <div>
      <div class="icon-line justify-end">
        <img src="@/assets/icons/sort_black.svg" alt="sort" class="sort" />
      </div>
      <v-row no-gutters>
        <v-col
          v-for="(item, index) in list"
          :key="'cadr-' + item.sys_code"
          cols="4"
          xs="2"
          sm="3"
          md="3"
        >
          <div class="body-round">
            <v-card>
              <v-img
                height="240"
                :src="'https://cdn.vuetifyjs.com/images/cards/' + item.pic_path"
              >
                <div class="sys-text">
                  <div class="sys-name" v-text="item.sys_name"></div>
                  <div
                    class="sys-type"
                    v-text="'(' + item.sys_type + ')'"
                  ></div>
                </div>
              </v-img>
              <v-card-text>{{ item.sys_desc }} </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="openLogin">
                  เข้าสู่ระบบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Modal from './../components/Modal'
export default {
  name: 'dashboard',
  components: {
    Modal
  },
  data () {
    return {
      list: [
        {
          pic_path: 'cooking.png',
          sys_name: 'GDB',
          sys_type: 'CRM',
          sys_code: '1',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        },
        {
          pic_path: 'cooking.png',
          sys_name: 'Cipher',
          sys_type: 'Data Center',
          sys_code: '2',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        },
        {
          pic_path: 'cooking.png',
          sys_name: 'Corporate Planning',
          sys_type: 'CRM',
          sys_code: '3',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        },
        {
          pic_path: 'cooking.png',
          sys_name: 'S&OP',
          sys_type: 'CRM',
          sys_code: '4',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        },
        {
          pic_path: 'cooking.png',
          sys_name: 'MktOps',
          sys_type: 'CRM',
          sys_code: '5',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        },
        {
          pic_path: 'cooking.png',
          sys_name: 'Bill Collection',
          sys_type: 'CRM',
          sys_code: '6',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        },
        {
          pic_path: 'cooking.png',
          sys_name: 'MktOps',
          sys_type: 'CRM',
          sys_code: '7',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        },
        {
          pic_path: 'cooking.png',
          sys_name: 'Portal Setting',
          sys_type: 'CRM',
          sys_code: '8',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        },
        {
          pic_path: 'cooking.png',
          sys_name: 'Test System',
          sys_type: 'CRM',
          sys_code: '9',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        }
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    }
  },
  watch: {},
  methods: {
    openLogin () {
      console.log('openLogin => ')
    }
  },
  mounted () {}
}
</script>
