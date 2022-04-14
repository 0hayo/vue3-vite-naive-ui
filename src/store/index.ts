import { createStore } from 'vuex';
import mapData from './modules/mapData';
import user from './modules/user';
import getters from './getters';

export default createStore({
  modules: {
    mapData,
    user
  },
  getters
});
