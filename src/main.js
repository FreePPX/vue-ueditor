import Vue from 'vue'
import App from './App.vue'
import VueUEditor from './lib/index.js';

Vue.use(VueUEditor)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
