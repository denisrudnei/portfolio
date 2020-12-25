import ggl from 'graphql-tag';

export const EditUser = ggl`
mutation EditUser($user: UserEditInput!) {
  EditUser(user: $user) {
    id
    name
    description
  }
}
`;
