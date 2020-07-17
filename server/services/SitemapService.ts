const ProjectService = require('./ProjectService')
async function getPaths () {
  const projects = await ProjectService.getAll()
  return projects.map(project => ({
    url: `/project/${project.url}/`,
    changefreq: 'monthly',
    priority: 0.1
  }))
}

module.exports = getPaths
