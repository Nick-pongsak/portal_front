<template>
  <div id="dashboard">
    <!-- <v-container class="grey lighten-5"> -->
    <div class="name-page">
      Product Manager (IT) Services
      <div class="line-page"></div>
    </div>
    <div>
      <div
        class="details"
        :style="{ border: showDragAndDrop ? '1px dashed #707070' : '' }"
      >
        <div
          class="justify-end"
          :style="{
            display: 'flex',
            'padding-top': showDragAndDrop ? '5px' : '0px',
            'padding-right': '5px'
          }"
        >
          <div v-if="showDragAndDrop">
            <v-btn text @click="clearDragAndDrop()" class="drag-btn close">
              {{ 'ปิด' }}
            </v-btn>
            <v-btn
              text
              @click="saveDragAndDrop()"
              class="drag-btn save"
              style="margin-left:10px"
            >
              {{ 'ยกเลิก / บันทึก' }}
            </v-btn>
          </div>
          <div class="icon-line" @click="openDragAndDrop()" v-else>
            <img src="@/assets/icons/sort_black.svg" alt="sort" class="sort" />
          </div>
        </div>
        <v-row no-gutters>
          <v-col
            v-for="(item, index) in list"
            :key="'cadr-' + item.sys_code"
            cols="6"
            xs="2"
            sm="3"
            md="3"
            draggable="true"
            @dragstart="dragStart(index, $event)"
            @dragover.prevent
            @dragenter="dragEnter"
            @dragleave="dragLeave"
            @dragend="dragEnd"
            @drop="dragFinish(index, $event)"
          >
            <div
              class="body-round"
              :style="{ cursor: showDragAndDrop ? 'move' : '' }"
            >
              <v-card>
                <v-img
                  :style="{ cursor: showDragAndDrop ? '' : 'pointer' }"
                  height="240"
                  :src="
                    'https://cdn.vuetifyjs.com/images/cards/' + item.pic_path
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

    <!---Dialogs-->
    <v-dialog v-model="dialog" width="700" :no-click-animation="false">
      <v-card id="detail-dashboard-dialogs">
        <v-card-text style="padding:20px 25px 20px 100px">
          <div class="justify-end" style="display: flex;">
            <v-btn icon @click="CloseDialogs()" style="height:20px;width:20px">
              <v-img src="@/assets/icons/close.svg"></v-img>
            </v-btn>
          </div>
          <div style="padding-right:90px;padding-top:20px">
            <v-img
              style="cursor:pointer;"
              height="200"
              :src="
                'https://cdn.vuetifyjs.com/images/cards/' + selectedRow.pic_path
              "
            >
            </v-img>
            <div class="sys-name">
              {{ selectedRow.sys_name + ' (' + selectedRow.sys_type + ')' }}
            </div>
            <div class="details">
              {{ selectedRow.sys_desc }}
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center" style="padding-bottom:20px">
          <v-btn text @click="CloseDialogs()" class="cancel-btn">
            {{ 'เข้าสู่ระบบ' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  components: {},
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
      ],
      dialog: false,
      selectedRow: {},
      showDragAndDrop: false,
      dragging: -1
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    },
    isDragging () {
      return this.dragging > -1
    }
  },
  watch: {
    list: {
      handler: function (todos) {
        if (this.showDragAndDrop) {
          console.log(todos)
        }
      },
      deep: true
    }
  },
  methods: {
    dragStart (which, ev) {
      if (this.showDragAndDrop) {
        ev.dataTransfer.setData('Text', this.id)
        ev.dataTransfer.dropEffect = 'move'
        this.dragging = which
      } else {
        return false
      }
    },
    removeItemAt (index) {
      this.list.splice(index, 1)
    },
    dragEnter (ev) {},
    dragLeave (ev) {},
    dragEnd (ev) {
      this.dragging = -1
    },
    dragFinish (to, ev) {
      if (this.showDragAndDrop) {
        this.moveItem(this.dragging, to)
      } else {
        return false
      }
    },
    moveItem (from, to) {
      if (this.showDragAndDrop) {
        if (to === -1) {
          this.removeItemAt(from)
        } else {
          this.list.splice(to, 0, this.list.splice(from, 1)[0])
        }
      } else {
        return false
      }
    },
    saveDragAndDrop () {},
    clearDragAndDrop () {
      this.showDragAndDrop = false
    },
    openDragAndDrop () {
      this.showDragAndDrop = true
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
    openLogin () {
      if (this.showDragAndDrop == false) {
        console.log('openLogin => ')
      }
    }
  },
  mounted () {}
}
</script>
