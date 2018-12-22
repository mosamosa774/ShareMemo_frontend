import Vue from 'vue'
import Router from 'vue-router'
import _Window from './views/mainWindow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'mainWindow',
      component: _Window
    }
  ]
})
