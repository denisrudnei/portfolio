import { Field, InputType } from 'type-graphql';

import ProfessionalExperienceInput from './professionalExperienceInput';
import SiteInput from './SiteInput';

@InputType()
class CurriculumInput {
  @Field()
  public nationality!: string

  @Field()
  public maritalStatus!: string

  @Field()
  public birthday!: Date

  @Field()
  public address!: string

  @Field()
  public cellPhone!: string

  @Field()
  public email!: string

  @Field(() => [SiteInput])
  public sites!: SiteInput[]

  @Field(() => [ProfessionalExperienceInput])
  public professionalExperience!: ProfessionalExperienceInput[]
}

export default CurriculumInput;
