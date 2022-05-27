import { EqState } from '../state';
const state: EqState = {
  radarList: [],
  sonarList: [],
  dtList: [],
  radarData: [],
  sonarData: []
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
  },
  UPDATE_SONAR_DATA(state: EqState, data) {
    state.sonarData = data;
  },
  UPDATE_RADAR_DATA(state: EqState, data) {
    state.radarData = data;
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
  },
  updateSonarData({ commit }, data) {
    commit('UPDATE_SONAR_DATA', data)
  },
  updateRadarData({ commit }, data) {
    commit('UPDATE_RADAR_DATA', data)
  }
}

export default {
  state,
  mutations,
  actions
}