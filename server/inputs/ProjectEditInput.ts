import { Field, InputType } from 'type-graphql';

@InputType()
class ProjectEditInput {
  @Field({ nullable: true })
  public name?: string

  @Field({ nullable: true })
  public description?: string

  @Field(() => [String], { nullable: true })
  public images?: string[]

  @Field(() => [String], { nullable: true })
  public languages?: string[]

  @Field(() => [String], { nullable: true })
  public frameworks?: string[]
}

export default ProjectEditInput;
