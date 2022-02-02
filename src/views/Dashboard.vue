<template>
  <div id="dashboard" v-resize="onResize">
    <div class="name-page">
      {{ $t('das.menu') }}
      <div class="line-page" style="margin-top: 15px;"></div>
    </div>
    <div>
      <div
        class="justify-end"
        :style="{
          display: 'flex',
          'padding-top': showDragAndDrop ? '10px' : '0px',
          'margin-bottom': showDragAndDrop ? '10px' : '0px',
          'padding-right': '5px'
        }"
      >
        <div v-if="showDragAndDrop">
          <v-btn text @click="clearDragAndDrop()" class="drag-btn close">
            {{ $t('btn_close') }}
          </v-btn>
          <v-btn
            text
            @click="saveDragAndDrop()"
            class="drag-btn save"
            style="margin-left:10px"
          >
            {{ $t('btn_save_close') }}
          </v-btn>
        </div>
        <div v-else class="icon-line" @click="openDragAndDrop()">
          <v-icon
            v-text="'mdi-sort-variant'"
            style="color:#000000;opacity:0.5;cursor:pointer"
            size="23"
          ></v-icon>
        </div>
      </div>
      <div
        class="details"
        :style="{
          display: 'flex',
          'padding-top': showDragAndDrop ? '10px' : '0px',
          border: showDragAndDrop ? '1px dashed #707070' : ''
        }"
      >
        <div :style="{ width: '15%' }"></div>
        <div :style="{ width: '70%' }">
          <dnd-zone :transition-duration="0.3">
            <dnd-container
              :dnd-model="list"
              dnd-id="grid-example"
              class="row"
              dense
            >
              <dnd-item
                v-for="item in list"
                :key="item.sys_code"
                :dnd-id="item.sys_code"
                :dnd-model="item"
                :is-draggable="showDragAndDrop"
              >
                <v-col
                  cols="12"
                  sm="12"
                  md="4"
                  lg="4"
                  xl="3"
                  style="display: flex;justify-content: center"
                >
                  <div
                    class="body-round"
                    :style="{
                      cursor: showDragAndDrop ? 'move' : ''
                    }"
                  >
                    <v-card :style="{ transform: tranformScale }">
                      <v-img
                        :style="{ cursor: showDragAndDrop ? '' : 'pointer' }"
                        height="180"
                        :src="
                          'https://cdn.vuetifyjs.com/images/cards/' +
                            item.pic_path
                        "
                        @click="openDialog(item)"
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
                        <v-btn text @click="openLogin(item)">
                          {{ $t('btn_signin') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </div>
                </v-col>
              </dnd-item>
            </dnd-container>
          </dnd-zone>
        </div>
        <div :style="{ width: '15%' }"></div>
      </div>
    </div>

    <!---Dialogs-->
    <v-dialog
      v-model="dialog"
      max-width="700"
      :no-click-animation="false"
      :style="{ transform: tranformScale }"
    >
      <v-card id="detail-dashboard-dialogs">
        <div class="justify-end" style="display: flex;">
          <v-icon
            @click="CloseDialogs()"
            v-text="'mdi-close'"
            style="color:#000000;"
            size="20"
          ></v-icon>
        </div>
        <div class="img-detail" :style="{ transform: tranformScale }">
          <v-img
            :style="{ transform: tranformScale }"
            max-height="257"
            max-width="498"
            :src="
              'https://cdn.vuetifyjs.com/images/cards/' + selectedRow.pic_path
            "
          >
          </v-img>
        </div>
        <div class="sys-name">
          {{ selectedRow.sys_name + ' (' + selectedRow.sys_type + ')' }}
        </div>
        <div class="details">
          <textarea v-model="selectedRow.sys_desc"></textarea>
        </div>
        <v-card-actions
          class="justify-center"
          style="padding-bottom:20px;padding-top:20px"
        >
          <v-btn text @click="CloseDialogs()" class="cancel-btn">
            {{ $t('btn_signin') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
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
          sys_name: 'Portal Setting',
          sys_type: 'CRM',
          sys_code: '9',
          sys_desc:
            'ระบบที่ใช้สำหรับกำหนด Master รายละเอียดต่าง ๆ ของสินค้า เช่น ราคาขายของ MT TT MTT รวมถึงรายละเอียดของแพ็คเก็ตสินค้า หีบ ห่อ ต่าง ๆ',
          login_path: ''
        }
      ],
      dialog: false,
      selectedRow: {},
      showDragAndDrop: false,
      tranformScale: 'scale(1)'
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    }
  },
  mounted () {
    this.onResize()
  },
  watch: {
    list: {
      handler: function (todos) {
        if (this.showDragAndDrop) {
          // console.log(todos)
        }
      },
      deep: true
    }
  },
  methods: {
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      if (x <= 375) {
        this.tranformScale = 'scale(0.8)'
      } else if (x > 375 && x <= 550) {
        this.tranformScale = 'scale(0.9)'
      } else if (x <= 1110 && x >= 960) {
        this.tranformScale = 'scale(0.8)'
      } else {
        this.tranformScale = 'scale(1)'
      }
    },
    saveDragAndDrop () {
      this.showDragAndDrop = false
      this.onResize()
    },
    clearDragAndDrop () {
      this.showDragAndDrop = false
      this.onResize()
    },
    openDragAndDrop () {
      this.showDragAndDrop = true
      this.onResize()
    },
    openDialog (row) {
      if (this.showDragAndDrop == false) {
        this.selectedRow = row
        this.dialog = true
      }
    },
    CloseDialogs () {
      this.dialog = false
    },
    openLogin (row) {
      if (row.sys_name == 'Portal Setting') {
        this.$router.push('/setting')
      } else if (this.showDragAndDrop == false) {
        console.log('openLogin => ')
      }
    }
  },
  mounted () {}
}
</script>
