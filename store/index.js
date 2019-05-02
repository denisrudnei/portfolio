export const state = () => ({
  text: ''
})

export const actions = {
  nuxtServerInit: ({ commit }, { req }) => {
    if (req.session && req.session.authUser) {
      commit('auth/SET_USER', req.session.authUser)
    }
  }
}
