import Vue from 'vue';
import './theme.scss';
import App from './App.vue'
import router from './plugin/router'
import store from './store'
import plugins from  './plugin';
import directives from './directives';


plugins.forEach(r => Vue.use(r.name, r.option));
directives.forEach(r => Vue.directive(r.name, r.option));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
