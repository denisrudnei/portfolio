import Post from '../models/Post';

class PostService {
  public static getAll() {
    return new Promise((resolve, reject) => {
      Post.find({}).then((posts) => resolve(posts)).catch((err) => {
        reject(err);
      });
    });
  }

  public static getOne(url: string) {
    return new Promise((resolve, reject) => {
      Post.findOne({
        url: decodeURIComponent(url),
      }).then((post) => resolve(post)).catch((err) => reject(err));
    });
  }

  public static create(post: Post) {
    const newPost = Post.create();

    newPost.title = post.title;
    newPost.content = post.content;

    return Post.save(newPost);
  }

  public static remove(postId: Post['id']) {
    return Post.delete({
      id: postId,
    });
  }
}

export default PostService;
