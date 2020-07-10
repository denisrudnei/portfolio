export const stata = () => ({
  authUser: null
})

export const getters = {
  getLogged: (state) => {
    return state.loggedIn
  },
  getUser: (state) => {
    return state.authUser
  }
}

export const mutations = {
  SET_USER: (state, user) => {
    state.authUser = user
  }
}
