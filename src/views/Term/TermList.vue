<template>
  <div id="user-list" style="height:calc(100% - 50px);">
    <v-card style="padding:20px 5px 20px 20px;height: calc(100% - 10px);">
      <div :class="'tab'" style="padding-top:0px;padding-left:0px">
        <div
          :class="'tab-row'"
          v-for="item in menu"
          :key="item.code"
          @click="tabs(item)"
          :id="'tab' + item.code"
        >
          {{ $t(item.text) }}
          <div v-show="activeTab == item.code" class="line-active"></div>
        </div>
      </div>
      <div>
        หหหหหหหหหหหหหห
      </div>
    </v-card>
    <div style="display:flex;padding-top:15px">
      <div style="width:50%">
        <v-btn
          v-show="editRow.mode == 'edit' && editRow.active == 0"
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
          v-if="
            editRow.mode == 'add' ||
              (editRow.mode == 'edit' && editRow.active == 0)
          "
          @click="saveBtn()"
          class="ok-btn md-btn"
          :style="{
            'margin-right': '6px',
            height: '22px'
          }"
          :disabled="enableBtn"
        >
          {{ $t('btn_save') }}
        </v-btn>
        <v-btn
          v-if="
            editRow.mode == 'add' ||
              (editRow.mode == 'edit' && editRow.active == 0)
          "
          @click="saveAndActiveBtn()"
          :class="'cancel-btn'"
          :disabled="enableBtn"
          style="height: 22px;width:180px"
        >
          {{ $t('term.text6') }}
        </v-btn>
        <v-btn
          v-if="editRow.mode == 'edit' && editRow.active == 1"
          @click="saveAndActiveBtn()"
          :class="'cancel-btn'"
          style="height: 22px;width:180px"
        >
          {{ $t('term.text13') }}
        </v-btn>
      </div>
    </div>

    <v-dialog
      v-model="dialog"
      :max-width="btnClick == 'saveActive' ? 430 : 350"
    >
      <v-card class="confirm-dialog">
        <v-card-title
          v-text="errorDialog"
          :style="{ 'font-weight': error ? '400' : '500' }"
        >
        </v-card-title>
        <div
          v-if="btnClick == 'saveActive'"
          style="color:#727272;font-size:13px;margin-top:15px"
        >
          <div>
            {{ $t('term.text10') }}
          </div>
          <div>
            {{ $t('term.text11') }}
          </div>
          <div>
            {{ $t('term.text12') }}
          </div>
        </div>
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
  </div>
</template>

<script>
export default {
  name: 'term-list',
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
      enableBtn: false,
      activeTab: 1,
      menu: [
        {
          code: 1,
          text: 'term.text7'
        },
        {
          code: 2,
          text: 'term.text8'
        }
      ],
      btnClick: ''
    }
  },
  computed: {
    info () {
      return this.$store.getters.user
    }
  },
  watch: {},
  methods: {
    tabs (item) {
      this.activeTab = item.code
    },
    cancelBtn () {
      // let result = JSON.parse(JSON.stringify(this.editRow))
      // let str2 = JSON.stringify(result)
      // if (str1 == str2) {
      //   this.cancel()
      // } else {
      this.error = false
      this.btnClick = 'cancel'
      this.dialog = true
      this.errorDialog = this.$t('popup.text6')
      this.rightBtn = this.$t('btn_ok')
      // }
    },
    saveAndActiveBtn () {
      this.btnClick = 'saveActive'
      let item = this.editRow
      if (this.enableBtn == false) {
        this.error = false
        this.dialog = true
        this.errorDialog = this.$t('term.text9')
        this.rightBtn = this.$t('btn_save')
      } else {
        console.log('saveBtn...', item)
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
        this.error = false
        this.dialog = true
        this.errorDialog = this.$t('popup.text1')
        this.rightBtn = this.$t('btn_save')
      } else {
        console.log('saveBtn...', item)
      }
    },
    save () {
      if (this.btnClick == 'save') {
        let result = JSON.parse(JSON.stringify(this.editRow))
        let url = this.editRow.mode == 'add' ? 'addTerm' : 'updateTerm'
        result.event = 'draft'

        // this.$store.dispatch(url, result).then(res => {
        console.log('save ', result)
        // this.$emit('cancel', null)
        // })
      } else if (this.btnClick == 'saveActive') {
        let result = JSON.parse(JSON.stringify(this.editRow))
        let url = this.editRow.mode == 'add' ? 'addTerm' : 'updateTerm'
        result.event = 'save-and-active'

        // this.$store.dispatch(url, result).then(res => {
        console.log('save and active', result)
        // this.$emit('cancel', null)
        // })
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
        con_id: this.editRow.con_id
      }
      this.$store.dispatch('deleteTerm', result).then(res => {
        this.dialog = false
        this.$emit('clear', null)
      })
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
      console.log(this.editRow)
    }
  },
  mounted () {}
}
</script>
