import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import '@mdi/font/scss/materialdesignicons.scss'



import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/index.css'
Vue.use(VXETable)


import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import './style/overrides.scss'

Vue.use(Vuetify);
const vuetify_opt = {
  theme: {
    disabled: true,
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
};


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify(vuetify_opt),
  render: h => h(App)
}).$mount('#app')
