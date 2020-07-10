export default {
  methods: {
    removeHtml (html = '') {
      return '' // html.replace(/<[^>]*>?/gm, '')
    }
  }
}
