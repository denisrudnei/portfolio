import { Field, InputType } from 'type-graphql';

@InputType()
class ProjectCreateInput {
  @Field()
  public name!: string

  @Field()
  public description!: string

  @Field(() => [String], { nullable: true })
  public images!: string[]

  @Field(() => [String], { nullable: true })
  public languages!: string[]

  @Field(() => [String], { nullable: true })
  public frameworks!: string[]
}

export default ProjectCreateInput;
