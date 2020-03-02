import Vue from 'vue';
import Vuex from 'vuex';
import playMusic from './modules/play_music';

Vue.use(Vuex);

// 自动化导入
// const storeContext = require.context('@/store/modules', true, /\.js$/)

export default new Vuex.Store({
  modules: {
    playMusic
  },
  strict: process.env.NODE_ENV !== 'production',
})
