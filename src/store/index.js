import Vue from "vue"
import Vuex from "vuex"

import catalog from './main.module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        catalog
    }
})
