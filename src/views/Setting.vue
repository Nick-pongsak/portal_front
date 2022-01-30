<template>
  <div id="setting-page">
    <div class="left">
      <div class="header">ตั้งค่าระบบ</div>
      <div class="list">
        <div
          :class="
            selectedItem.code == item.code ? 'list-row active' : 'list-row'
          "
          v-for="(item, index) in menu"
          :key="item.code"
          @click="selectedMenu(item, index)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="header">{{ selectedItem.text }}</div>
      <v-card>
        <div :class="'tab'">
          <div
            :class="'tab-row'"
            v-for="(item, index) in menu"
            :key="item.code"
            @click="selectedTabs(item, index)"
          >
            {{ item.text }}
            <div
              v-show="selectedTab.code == item.code"
              class="line-active"
            ></div>
          </div>
        </div>
        <div style="padding-left:30px">
          <div class="input-with-icon" style="display: flex;width: 300px;">
            <img
              style="color:#000000;opacity:0.5;margin-right:8px;height:22px;padding-top:5px;padding-left:5px"
              src="@/assets/icons/search.svg"
              alt="search"
              class="sesrch"
            />
            <input type="text" v-model="searchApp" :placeholder="'ค้นหา'" />
          </div>
        </div>
        <div class="table">
          <div class="head-table">
            <div class="head" style="width:10%" @click="sort('no')">
              <div class="column-name">ลำดับ</div>
              <img
                v-if="sortNo"
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_up_black.svg"
                alt="sort"
              />
              <img
                v-else
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_down_black.svg"
                alt="sort"
              />
            </div>
            <div class="head" style="width:30%" @click="sort('app_name')">
              <div class="column-name">แอปพิเคชั่น</div>
              <img
                v-if="sortAppName"
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_up_black.svg"
                alt="sort"
              />
              <img
                v-else
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_down_black.svg"
                alt="sort"
              />
            </div>
            <div class="head" style="width:13%" @click="sort('type')">
              <div class="column-name">
                หมวดหมู่
              </div>
              <img
                v-if="sortType"
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_up_black.svg"
                alt="sort"
              />
              <img
                v-else
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_down_black.svg"
                alt="sort"
              />
            </div>
            <div class="head" style="width:22%" @click="sort('access')">
              <div class="column-name">
                การเข้าการใช้งาน
              </div>
              <img
                v-if="sortAccess"
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_up_black.svg"
                alt="sort"
              />
              <img
                v-else
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_down_black.svg"
                alt="sort"
              />
            </div>
            <div class="head" style="width:15%" @click="sort('status')">
              <div class="column-name">
                สถานะ
              </div>
              <img
                v-if="sortStatus"
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_up_black.svg"
                alt="sort"
              />
              <img
                v-else
                style="opacity:0.5;margin-left:8px"
                src="@/assets/icons/arrow_drop_down_black.svg"
                alt="sort"
              />
            </div>
            <div class="head" style="width:10%">
              <div class="column-name">
                เครื่องมือ
              </div>
            </div>
          </div>
          <div class="body-table">
            <div
              class="body-row"
              v-for="(item, index) in list"
              :key="'app_name_' + index"
            >
              <div
                class="body"
                style="width:10%;padding-top:5px;padding-left:15px"
              >
                {{ index + 1 }}
              </div>
              <div
                class="body"
                style="width:30%;padding-left:5px;padding-top:5px"
              >
                {{ item.app_name + ' index' }}
              </div>
              <div class="body" style="width:13%;padding-top:5px">
                {{ item.type }}
              </div>
              <div class="body" style="width:22%;display:flex">
                {{ item.access }}
              </div>
              <div
                class="body"
                :style="{
                  width: '15%',
                  display: 'flex',
                  color: item.status == true ? '#66BB6A' : '#FBC02D'
                }"
              >
                {{ item.status == true ? 'เปิดใช้งาน' : 'ปิดการใช้งาน' }}
              </div>
              <div class="body" style="width:10%;display:flex">
                {{ 'edit' }}
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      menu: [
        {
          code: '1',
          text: 'ผู้ใช้งานระบบ'
        },
        {
          code: '2',
          text: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ',
          child: [
            {
              code: '1',
              text: 'รายการแอปพลิเคชัน'
            },
            {
              code: '2',
              text: 'จัดกลุ่มผู้ใช้งานแอปพลิเคชัน'
            }
          ]
        }
      ],
      selectedItem: {
        code: '2',
        text: 'การจัดการแอปพลิเคชันที่เชื่อมต่อ'
      },
      selectedTab: {
        code: '1',
        text: 'รายการแอปพลิเคชัน'
      },
      list: [
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'LDAP (AD',
          status: false
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        },
        {
          app_name: 'app',
          type: 'CRM',
          access: 'ผู้ใช้งานแอปพลิเคชัน',
          status: true
        }
      ],
      searchApp: '',
      sortNo: false,
      sortAppName: false,
      sortType: false,
      sortAccess: false,
      sortStatus: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    selectedMenu (item, index) {
      this.selectedItem = item
    },
    selectedTabs (item, index) {
      this.selectedTab = item
    },
    sort (feild) {
      if (feild == 'no') {
        this.sortNo = !this.sortNo
      } else if (feild == 'app_name') {
        this.sortAppName = !this.sortAppName
      } else if (feild == 'type') {
        this.sortType = !this.sortType
      } else if (feild == 'access') {
        this.sortAccess = !this.sortAccess
      } else if (feild == 'status') {
        this.sortStatus = !this.sortStatus
      }
    }
  },
  mounted () {}
}
</script>
