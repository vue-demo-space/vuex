const state = {
  userName: 'fish'
}

const mutations = {
  SET_USER_NAME (state, userName) {
    state.userName = userName
  }
}

const actions = {
  updateUserName ({ commit, state, rootState }, newUserName) {
    // 模拟接口调用
    setTimeout(() => {
      commit('SET_USER_NAME', newUserName)
    }, 2000)
  }
}

const getters = {
  userFullName: state => state.userName + ' yu'
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
