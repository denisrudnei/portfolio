import ggl from 'graphql-tag';

export const CreatePost = ggl`
mutation CreatePost($post: PostCreateInput!) {
  CreatePost(post: $post) {
    id
    title
    content
    created
  }
}
`;
