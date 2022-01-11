import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;
import Vue from 'vue'
import router from './../../router'


const store = {
  state: {
    loading: false,
    showModal: false,
    typeModal: false,
    detailModal: '',

  },
  mutations: {
    SetShowModal(state, data) {
      state.showModal = data;
    },
    SetTypeModal(state, data) {
      state.typeModal = data;
    },
    SetDetailModal(state, data) {
      state.detailModal = data;
    },
  },
  actions: {
    SetModal({
      state,
      commit
    }, data) {
      commit("SetTypeModal", data.mode);
      commit("SetShowModal", data.value);
      commit("SetDetailModal", data.detail);
    },

    FetchMainData({
      state,
      commit,
      dispatch
    }, data) {
      // TEST
    },

  },
  getters: {
    showModal(state) {
      return state.showModal;
    },
    isLoading(state) {
      return state.loading;
    },
    typeModal(state) {
      return state.typeModal;
    },
    detailModal(state) {
      return state.detailModal;
    },
  }
}

export default store;