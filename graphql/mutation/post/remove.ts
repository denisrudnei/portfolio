import ggl from 'graphql-tag';

export const RemovePost = ggl`
mutation DeletePost($id: ID!) {
  DeletePost(id: $id)
}
`;
