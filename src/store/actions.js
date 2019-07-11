const actions = {
  updateAppName ({ commit, state, rootState, dispatch }, newAppName) {
    // 模拟接口调用
    setTimeout(() => {
      commit('SET_APP_NAME', newAppName)
    }, 2000)
  }
}

export default actions
