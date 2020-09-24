import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Timeline from './views/Timeline.vue'
import Import from './views/Import.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title: "Data Cleaning for All"
      }
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: Timeline,
      meta:{
        title: "Timeline - Data Cleaning for All"
      }
    },
    {
      path: '/import',
      name: 'Import CSV File',
      component: Import,
      meta:{
        title: "Import - Data Cleaning for All"
      }
    }
  ]
})