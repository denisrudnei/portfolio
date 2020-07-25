/* eslint-disable class-methods-use-this */
import {
  Resolver, Query, Mutation, ID, Arg, Authorized,
} from 'type-graphql';
import Post from '../models/Post';
import PostService from '../services/PostService';
import PostCreateInput from '../inputs/PostCreateInput';

@Resolver(() => Post)
class PostResolver {
  @Query(() => [Post])
  public Post(): Promise<Post[]> {
    return PostService.getAll();
  }

  @Query(() => Post)
  public GetOnePost(@Arg('url', () => String) url: Post['url']): Promise<Post> {
    return PostService.getOne(url);
  }

  @Mutation(() => Post)
  @Authorized('user')
  public CreatePost(@Arg('post', () => PostCreateInput) post: Post): Promise<Post> {
    return PostService.create(post);
  }

  @Mutation(() => Boolean)
  public DeletePost(@Arg('id', () => ID) id: Post['id']): Promise<boolean> {
    return PostService.remove(id);
  }
}

export default PostResolver;
