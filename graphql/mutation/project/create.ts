import ggl from 'graphql-tag';

export const CreateProject = ggl`
mutation CreateProject($project: ProjectCreateInput!) {
  CreateProject(project: $project) {
    id
    name
    description
  }
}
`;
