import Vue from 'vue'
import App from './App'
import Index from './index'

/* eslint-disable no-new */
window.Vue = Vue;
Vue.use(require('vue-resource'));
new Vue({
  el: 'body',
  components: { App,
  Index }
})
