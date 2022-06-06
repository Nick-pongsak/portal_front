<template>
  <div id="term-list" style="height:calc(100% - 50px);">
    <v-card style="padding:20px 20px 20px 20px;height: calc(100% - 10px);">
      <div style="display:flex;width:100%">
        <div
          :class="'tab'"
          style="padding-top:0px;padding-left:0px;padding-bottom:3px;"
        >
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
        <div style="width:20%;color:#66BB6A;font-size:14px;text-align: end;">
          <v-icon
            v-show="
              (editRow.mode == 'edit' && editRow.active == 1) ||
                (editRow.mode == 'view' && editRow.active == 1)
            "
            v-text="'mdi-checkbox-marked-circle'"
            style="color:#66BB6A;margin-right:7px"
            size="19"
          ></v-icon>
          <span
            v-show="
              (editRow.mode == 'edit' && editRow.active == 1) ||
                (editRow.mode == 'view' && editRow.active == 1)
            "
          >
            {{ $t('user.text7') }}
          </span>
        </div>
      </div>
      <div>
        <quill-editor
          :disabled="
            (editRow.mode == 'edit' && editRow.active == 1) ||
              editRow.mode == 'view'
          "
          v-if="activeTab == 1"
          v-model="conditionTh"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        >
        </quill-editor>
        <quill-editor
          :disabled="
            (editRow.mode == 'edit' && editRow.active == 1) ||
              editRow.mode == 'view'
          "
          v-if="activeTab == 2"
          v-model="conditionEn"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        >
        </quill-editor>
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
          {{ editRow.mode == 'view' ? $t('btn_close') : $t('btn_cancel') }}
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
          :disabled="enableBtn || conditionEn == '' || conditionTh == ''"
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
          :disabled="enableBtn || conditionEn == '' || conditionTh == ''"
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
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
      btnClick: '',
      conditionTh: this.data.condition_th,
      conditionEn: this.data.condition_en,
      editorOption: {
        // some quill options
      }
    }
  },
  computed: {
    info () {
      return this.$store.getters.user
    },
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  watch: {},
  methods: {
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      this.content = html
    },
    tabs (item) {
      this.activeTab = item.code
    },
    cancelBtn () {
      if (this.editRow.mode == 'view') {
        this.cancel()
      } else {
        let result = JSON.parse(JSON.stringify(this.master))
        let str1 = {
          condition_th: result.condition_th,
          condition_en: result.condition_en,
          mode: result.mode
        }
        let str2 = {
          condition_th: this.conditionTh,
          condition_en: this.conditionEn,
          mode: result.mode
        }

        if (JSON.stringify(str1) == JSON.stringify(str2)) {
          this.cancel()
        } else {
          this.error = false
          this.btnClick = 'cancel'
          this.dialog = true
          this.errorDialog = this.$t('popup.text6')
          this.rightBtn = this.$t('btn_ok')
        }
      }
    },
    saveAndActiveBtn () {
      if (this.editRow.active == 1) {
        this.btnClick = 'saveInActive'
        let item = this.editRow
        if (this.enableBtn == false) {
          this.error = false
          this.dialog = true
          this.errorDialog = this.$t('term.text14')
          this.rightBtn = this.$t('btn_save')
        } else {
          console.log('saveInActive...', item)
        }
      } else {
        this.btnClick = 'saveActive'
        let item = this.editRow
        if (this.enableBtn == false) {
          this.error = false
          this.dialog = true
          this.errorDialog = this.$t('term.text9')
          this.rightBtn = this.$t('btn_save')
        } else {
          console.log('saveActive...', item)
        }
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
        let url = this.editRow.mode == 'add' ? 'addTerm' : 'updateTerm'
        let req = {
          event: 'draft',
          condition_th: this.conditionTh,
          condition_en: this.conditionEn
        }
        this.$store.dispatch(url, req).then(res => {
          this.$emit('cancel', null)
        })
      } else if (this.btnClick == 'saveActive') {
        let url = this.editRow.mode == 'add' ? 'addTerm' : 'updateTerm'
        let req = {
          con_id: this.editRow.con_id,
          event: 'save-and-active',
          condition_th: this.conditionTh,
          condition_en: this.conditionEn
        }

        this.$store.dispatch(url, req).then(res => {
          this.$emit('cancel', null)
        })
      } else if (this.btnClick == 'saveInActive') {
        let url = 'updateTerm'
        let req = {
          con_id: this.editRow.con_id,
          event: 'inactive',
          condition_th: this.conditionTh,
          condition_en: this.conditionEn
        }

        this.$store.dispatch(url, req).then(res => {
          this.$emit('cancel', null)
        })
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
  components: {
    quillEditor
  },
  mounted () {
    // if (process.browser) {
    //   const VueQuillEditor = require('vue-quill-editor/dist/ssr')
    //   Vue.use(VueQuillEditor /* { default global options } */)
    // }
  }
}
</script>
