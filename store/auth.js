/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
export const state = () => ({
  authUser: null,
});

export const getters = {
  getLogged: (state) => state.loggedIn,
  getUser: (state) => state.authUser,
};

export const mutations = {
  SET_USER: (state, user) => {
    state.authUser = user;
  },
};
