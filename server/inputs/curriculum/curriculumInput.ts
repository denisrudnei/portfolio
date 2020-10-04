import { Field, InputType, ID } from 'type-graphql';
import User from '../../models/User';
import Site from '../../models/curriculum/Site';

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

  @Field(() => ID)
  public sites!: Site['id'][]

  @Field(() => ID)
  public user!: User['id']
}

export default CurriculumInput;
