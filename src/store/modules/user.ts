const state = {
  token: '',
  userInfo: null
}

const mutations = {
  ADD_TOKEN(state, token) {
    state.token = token;
    sessionStorage.setItem('token', token)
  },
  USER_LOGIN(state, user) {
    state.userInfo = user;
    sessionStorage.setItem('userInfo', JSON.stringify(user))
  },
  USER_LOGOUT(state) {
    state.token = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userInfo');
  }
}

const actions = {
  logout({ commit }) {
    commit('USER_LOGOUT');
  },
  login({ commit }, result) {
    commit('USER_LOGIN', result.user);
    commit('ADD_TOKEN', result.token);
  }
}

export default {
  state,
  mutations,
  actions
}