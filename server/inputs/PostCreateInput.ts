import { Field, InputType } from 'type-graphql';

@InputType()
class PostCreateInput {
  @Field()
  public title!: string

  @Field()
  public content!: string
}

export default PostCreateInput;
