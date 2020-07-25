import { InputType, Field } from 'type-graphql';

@InputType()
class UserEditInput {
  @Field({ nullable: true })
  public name?: string

  @Field({ nullable: true })
  public description?: string
}

export default UserEditInput;
