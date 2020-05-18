import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export const store = new Store({
  plugins: [createLogger()]
})
