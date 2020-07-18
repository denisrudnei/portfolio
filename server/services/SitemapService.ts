import ProjectService from './ProjectService';

export default async function getPaths() {
  const projects = await ProjectService.getAll();
  return projects.map((project) => ({
    url: `/project/${project.url}/`,
    changefreq: 'monthly',
    priority: 0.1,
  }));
}
