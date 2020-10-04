import { Field, InputType, ID } from 'type-graphql';
import Period from '../../models/curriculum/Period';

@InputType()
class ProfessionalExperienceInput {
  @Field()
  public role!: string

  @Field()
  public mainActivities!: string

  @Field(() => ID)
  public period!: Period['id']
}

export default ProfessionalExperienceInput;
