import Vue from 'vue'
import App from './App.vue'

import router from "./router"
import store from "./store/index"

import Vant from 'vant';
// import { Lazyload } from "vant"

import 'vant/lib/index.less';

import "./styles/index.less"
import 'amfe-flexible'
import "./utils/Dayjs"
import { plugins } from "@/utils/toolFn"

Vue.use(Vant);

// Vue.use(Lazyload,{

// })

Vue.use(plugins)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
