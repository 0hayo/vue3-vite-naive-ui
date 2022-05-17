import { EqState } from '../state';
const state: EqState = {
  radarList: [],
  sonarList: [],
  dtList: []
}

const mutations = {
  UPDATE_RADAR(state: EqState, data) {
    state.radarList = data;
  },
  UPDATE_SONAR(state: EqState, data) {
    state.sonarList = data;
  },
  UPDATE_DT(state: EqState, data) {
    state.dtList = data;
  }
}

const actions = {
  updateRadar({ commit }, data) {
    commit('UPDATE_RADAR', data)
  },
  updateSonar({ commit }, data) {
    commit('UPDATE_SONAR', data)
  },
  updateDt({ commit }, data) {
    commit('UPDATE_DT', data)
  }
}

export default {
  state,
  mutations,
  actions
}