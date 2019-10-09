// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'
import store from './store'
// import Mock from "./javascript/mock"
import Mock from '@/mock'
process.env.Mock && require('./mock.js')




Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(Mock)


Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;



Vue.config.productionTip = false
axios.defaults.baseURL="http://localhost:8080/"

// 引入mockjs
require('./mock')

// router.beforeEach((to, from, next)=> {
//   if (to.name == 'Login') {
//     next();
//     return;
//   }
//   var name = store.state.user.name;
//   if (name == '未登录') {
//     if (to.meta.requireAuth || to.name == null) {
//       next({path: '/', query: {redirect: to.path}})
//     } else {
//       next();
//     }
//   } else {
//     initMenu(router, store);
//     if(to.path=='/chat')
//       store.commit("updateMsgList", []);
//     next();
//   }
// }
// )



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)

})


