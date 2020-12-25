import ggl from 'graphql-tag';

export const UnBlock = ggl`
mutation Unblock($token: String!) {
  Unblock(token: $token) {
    id
    name
    email
  }
}
`;
