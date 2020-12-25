import ggl from 'graphql-tag';

export const EditProject = ggl`
mutation EditProject($id: ID!, $project: ProjectEditInput!) {
  EditProject(id: $id, project: $project) {
    id
    name
    description
  }
}
`;
