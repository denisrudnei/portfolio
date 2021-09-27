/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const state = () => ({
  actualProject: undefined,
  projects: [],
});

export const getters = {
  getActualProject(state) {
    return state.actualProject;
  },
  getProjects(state) {
    return state.projects;
  },
};

export const mutations = {
  setActualProject(state, project) {
    state.actualProject = project;
  },
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
