/**
 * @author : wenhao.huang
 * @date   : 2018/3/12
 */

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import filter from 'filter'
import notify from 'components/notice/index'

Vue.config.productionTip = false

Vue.use(notify)
Vue.use(VueRouter)
Vue.use(filter)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
