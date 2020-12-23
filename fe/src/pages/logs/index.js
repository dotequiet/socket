import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import svgicon from 'vue-svgicon'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '@/styles/my-theme/element-variables.scss'
import { commonMixin } from '@/mixins/message.js'
import store from './store'
import routes from './routes'
import App from './App.vue'
import '@/styles/lib/main.scss'
import '../../icons'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(mavonEditor)
Vue.use(VueClipboard)
Vue.use(ElementUI, { size: 'small' })
Vue.use(VueRouter)
Vue.use(svgicon, { tagName: 'svgicon' })
const router = new VueRouter({
  routes,
  base: '/',
  mode: process.env.BUILD_MODE === 'dev' ? '' : 'history',
  saveScrollPosition: process.env.BUILD_MODE === 'dev'
})
const vm = new Vue({
  mixins: [commonMixin],
  el: '#app',
  router,
  store,
  created() {},
  methods: {},
  render: h => h(App)
})
