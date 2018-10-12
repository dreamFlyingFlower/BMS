// jshint esversion:6
// jshint node:true
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import tagsView from './modules/tagsView';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    tagsView
  },
  state,
  getters,
  mutations,
  actions
});

export default store;