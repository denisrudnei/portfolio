import { InputType, Field } from 'type-graphql';

@InputType()
class ProjectEditInput {
  @Field({ nullable: true })
  public name?: string

  @Field({ nullable: true })
  public description?: string

  @Field(() => [String], { nullable: true })
  public images?: string[]
}

export default ProjectEditInput;
