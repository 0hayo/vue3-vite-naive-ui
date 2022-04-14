const state = {
  token: ''
}

const mutations = {
  ADD_TOKEN(state, token) {
    state.token = token;
    // localStorage.setItem('token', token);
  },
  USER_LOGOUT(state) {
    state.token = null;
    // localStorage.removeItem('token');
  }
}

const actions = {
  addToken({ commit }, token) {
    commit('ADD_TOKEN', token);
  },
  logout({ commit }) {
    commit('USER_LOGOUT');
  }
}

export default {
  state,
  mutations,
  actions
}