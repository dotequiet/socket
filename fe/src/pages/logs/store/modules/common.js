const common = {
  state: {
    userInfo: {
      id: 1234 + +new Date()
    },
    loading: false
  },
  mutations: {
    SET_USER_INFO: (state, userDetail) => {
      state.userInfo = userDetail
    },
    SET_LOADING: (state, status) => {
      state.loading = status
    }
  },
  actions: {
    setUserInfo: ({ commit }, userDetail = {}) => {
      commit('SET_USER_INFO', userDetail)
    }
  }
}
export default common
