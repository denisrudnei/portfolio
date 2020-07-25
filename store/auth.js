/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const getters = {
  getLogged: (state) => state.loggedIn,
  getUser: (state) => state.user,
};

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user;
  },
};
