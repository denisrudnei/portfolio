import { Field, InputType } from 'type-graphql';
import CurriculumInput from './curriculum/curriculumInput';

@InputType()
class UserEditInput {
  @Field({ nullable: true })
  public name?: string

  @Field({ nullable: true })
  public description?: string

  @Field({ nullable: true })
  public curriculum?: CurriculumInput
}

export default UserEditInput;
