import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import common from './modules/common'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [createLogger()],
  modules: {
    common
  },
  getters
})

export default store
