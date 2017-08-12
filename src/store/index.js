import Vue from 'vue';
import Vuex from 'vuex';
import defaultState from './state';
import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: defaultState,
  mutations,
  actions,
  getters,
});

store.watch(state => state.items, () => {
  store.dispatch('save');
});

export default store;
