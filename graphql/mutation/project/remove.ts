import ggl from 'graphql-tag';

export const RemoveProject = ggl`
mutation DeleteProject($id: ID!) {
  DeleteProject(id: $id)
}
`;
