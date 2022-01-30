import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
// import underMaintenance from '@/views/UnderMaintenance.vue'
import DefaultLayout from "@/views/Default.vue";
import Setting from "@/views/Setting.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Login,
      meta: {
        rule: "isPublic"
      }
    },
    {
      path: "/home",
      component: DefaultLayout,
      children: [
        {
          path: "/home",
          component: Dashboard,
          // meta: {
          //   rule: "isPublic",
          //   auth: true
          // }
        },
        {
          path: "/setting",
          component: Setting,
          // meta: {
          //   rule: "isPublic",
          //   auth: true
          // }
        },
      ]
    }
  ]
})
