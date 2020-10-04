import { Field, ID, InputType } from 'type-graphql';

import PeriodInput from './periodInput';

@InputType()
class ProfessionalExperienceInput {
  @Field()
  public local!: string

  @Field()
  public role!: string

  @Field()
  public mainActivities!: string

  @Field(() => PeriodInput)
  public period!: PeriodInput
}

export default ProfessionalExperienceInput;
