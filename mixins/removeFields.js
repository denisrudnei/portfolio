export default {
  methods: {
    removeFields(object, fields = ['__typename']) {
      if (!object) return object;
      Object.keys(object).forEach((key) => {
        if (fields.includes(key)) {
          // eslint-disable-next-line no-param-reassign
          delete object[key];
        } else {
          const field = object[key];
          if (Array.isArray(field)) {
            field.forEach((item) => this.removeFields(item, fields));
          }
          if (typeof field === 'object') {
            this.removeFields(field, fields);
          }
        }
      });
      return object;
    },
  },
};
