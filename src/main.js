import Vue from 'vue'
import Shop from './Shop.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Shop),
}).$mount('#app')
