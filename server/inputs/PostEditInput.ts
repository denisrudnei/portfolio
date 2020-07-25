import { InputType, Field } from 'type-graphql';

@InputType()
class PostEditInput {
  @Field({ nullable: true })
  public title!: string

  @Field({ nullable: true })
  public content!: string
}
export default PostEditInput;
