import Vue from 'vue'
import VueRouter from 'vue-router'
import Spectre from '@/components/spectre/index'
// 引入 Element UI 组件库及样式，用于美化流程弹框
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Design from '@/components/design/index'
Vue.use(Spectre)
Vue.use(VueRouter)
// 全局注册 Element UI
Vue.use(ElementUI)
Vue.component('v-icon', Icon)
Vue.config.productionTip = false
const routes = [
  {
    path: '/', 
    component: Design,
    name: 'design',
  },
]
const router = new VueRouter({
  routes,
})
new Vue({
  router
}).$mount('#app')