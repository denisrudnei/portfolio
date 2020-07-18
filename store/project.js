/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
export const state = () => ({
  projects: [],
});
export const getters = {
  getProjects(state) {
    return state.projects;
  },
};

export const mutations = {
  setProjects(state, projects) {
    state.projects = projects;
  },
  addProject(state, project) {
    state.projects.push(project);
  },
  removeProject(state, project) {
    state.projects = state.projects.filter((p) => p.id !== project.id);
  },
};

export const actions = {
  getProjects({ commit }) {
    this.$axios.get('/project/').then((response) => {
      commit('setProjects', response.data);
    });
  },
};
