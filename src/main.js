import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App';
import store from './store';

Vue.use(BootstrapVue);

Vue.config.devtools = true;
Vue.config.productionTip = false;

// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  components: { App },
  el: '#app',
  template: '<App/>',
  store,
});

store.dispatch('load');
