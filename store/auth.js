/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */

export const getters = {
  getLogged(state) {
    return state.loggedIn;
  },
  getUser(state) {
    return state.user;
  },
};
