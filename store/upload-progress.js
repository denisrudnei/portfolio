/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const state = () => ({
  upload: false,
  progress: 0,
});

export const getters = {
  getUpload(state) {
    return state.upload;
  },
  getProgress(state) {
    return state.progress;
  },
};

export const mutations = {
  setUpload(state, upload) {
    state.upload = upload;
  },
  setProgress(state, progress) {
    state.progress = progress;
  },
};
