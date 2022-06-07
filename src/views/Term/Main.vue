<template>
  <div style="height:calc(100% - 0px);">
    <v-card style="padding-top:30px">
      <div style="padding-left:30px;display:flex;width:100%">
        <div style="width:80%">
          <div class="input-with-icon" style="display: flex;width: 300px">
            <v-icon
              v-text="'mdi-magnify'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
            <input
              type="text"
              v-model="searchApp"
              :placeholder="$t('input_search')"
              maxlength="250"
            />
          </div>
        </div>
        <div
          class="justify-end"
          style="width:20%;display:flex;padding-right:30px"
        >
          <v-btn @click="add()" class="cancel-btn">
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
          <div class="head" style="width:8%" @click="sort(headCol[0], 0)">
            <div class="column-name">{{ $t('set.list_col1') }}</div>
            <v-icon
              v-text="sortNo == 0 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="20"
            ></v-icon>
          </div>
          <div
            class="head"
            style="width:20%;padding-left:5px"
            @click="sort('name_' + $i18n.locale, 1)"
          >
            <div class="column-name">{{ $t('term.text3') }}</div>
            <v-icon
              v-text="sortNo == 1 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:20%" @click="sort(headCol[2], 2)">
            <div class="column-name">
              {{ $t('term.text4') }}
            </div>
            <v-icon
              v-text="sortNo == 2 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:20%" @click="sort(headCol[3], 3)">
            <div class="column-name">
              {{ $t('set.list_col5') }}
            </div>
            <v-icon
              v-text="sortNo == 3 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:20%" @click="sort(headCol[4], 4)">
            <div class="column-name">
              {{ $t('term.text5') }}
            </div>
            <v-icon
              v-text="sortNo == 4 ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;opacity:0.5;margin-right:8px;padding-left:5px"
              size="22"
            ></v-icon>
          </div>
          <div class="head" style="width:12%">
            <div class="column-name">
              {{ $t('set.list_col6') }}
            </div>
          </div>
        </div>
        <div class="body-table" style="height: calc(100% - 90px);">
          <div v-if="list.length == 0" class="no-data">
            {{ $t('popup.text9') }}
          </div>
          <div
            class="body-row"
            v-for="(item, index) in list"
            :key="'app_name_' + index"
          >
            <div class="body" style="width:8%;padding-top:5px;padding-left:7px">
              {{ item.index + 1 }}
            </div>
            <div
              class="body"
              style="width:20%;padding-left:5px;padding-top:5px"
            >
              {{ item['name_' + $i18n.locale] }}
            </div>
            <div
              class="body"
              style="width:20%;padding-left:5px;padding-top:5px"
            >
              {{ item.start_date }}
            </div>
            <div
              class="body"
              :style="{
                'padding-top': '5px',
                width: '20%',
                display: 'flex',
                color: item.active ? '#66BB6A' : '#FBC02D'
              }"
            >
              {{ item.active ? $t('user.text7') : $t('user.text8') }}
            </div>
            <div class="body" style="width:20%;display:flex;padding-top: 5px;">
              {{ item.amount_user }}
            </div>
            <div class="body" style="width:12%;display:flex;padding-left:12px">
              <v-icon
                @click="view(item)"
                v-text="'mdi-magnify'"
                style="color:#CE1212;margin-right:10px"
                size="19"
              ></v-icon>
              <v-icon
                v-if="
                  (item.start_date == '-' && item.active == 0) ||
                    item.active == 1
                "
                @click="edit(item)"
                v-text="'mdi-pencil'"
                style="color:#CE1212"
                size="19"
              ></v-icon>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'main-term',
  props: {},
  data () {
    return {
      list: [],
      searchApp: '',
      sortNo: null,
      headCol: [
        'index',
        'name_th',
        'start_date',
        'active',
        'amount_user',
        'status'
      ],
      mainSort: {
        feild: '',
        // feild: 'name_'+this.$i18n.locale,
        orderby: true
      }
    }
  },
  computed: {},
  watch: {
    searchApp: {
      handler: function (todos) {
        if (todos.trim().length > 1 || todos.trim().length == 0) {
          this.fetchData()
        }
      }
    }
  },
  methods: {
    add () {
      let item = { mode: 'add', condition_th: '', condition_en: '' }
      this.$emit('add', item)
    },
    edit (item) {
      item.mode = 'edit'
      this.$emit('edit', item)
    },
    view (item) {
      item.mode = 'view'
      this.$emit('view', item)
    },
    sort (feild, index) {
      this.sortNo = this.sortNo == index ? null : index
      if (feild == 'index') {
        if (this.mainSort.orderby) {
          this.list = this.list.sort(function (a, b) {
            return b.index - a.index
          })
        } else {
          this.list = this.list.sort(function (a, b) {
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
        this.fetchData()
      }
    },
    fetchData (item) {
      let req = {
        keyword: this.searchApp.trim(),
        field: this.mainSort.feild,
        sort: this.mainSort.orderby ? 'asc' : 'desc'
      }
      this.$store.dispatch('fetchTerm', req).then(res => {
        this.list = res.data
      })
    }
  },
  mounted () {},
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
    this.items = []
    this.fetchData()
  },
  components: {}
}
</script>
