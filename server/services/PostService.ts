import Post from '../models/Post';

class PostService {
  public static getAll(): Promise<Post[]> {
    return Post.find({});
  }

  public static async getOne(url: string): Promise<Post> {
    const post = await Post.findOne({
      url: decodeURIComponent(url),
    });
    return post!;
  }

  public static create(post: Post): Promise<Post> {
    const newPost = Post.create();

    newPost.title = post.title;
    newPost.content = post.content;

    return Post.save(newPost);
  }

  public static async remove(postId: Post['id']): Promise<boolean> {
    await Post.delete({
      id: postId,
    });
    return !(await Post.findOne(postId));
  }
}

export default PostService;
