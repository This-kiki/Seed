// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

const user = {
  namespaced: true,
  state: {
    // token令牌
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Mjc4MTgyMTUsInVzZXJuYW1lIjoiYWRtaW4ifQ.VzHccj9ywjujHda2GlgWirMQSN5JijiFekVBlURoybg',
  },
  mutations: {
    setToken(state, map) {
      console.log('getToken')
      state.token = map.token
    }
  }
};
export default user;