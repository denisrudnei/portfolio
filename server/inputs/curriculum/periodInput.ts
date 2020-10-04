import { InputType, Field } from 'type-graphql';

@InputType()
class PeriodInput {
  @Field(() => Date)
  public start!: Date

  @Field(() => Date)
  public finish?: Date

  @Field()
  public actual!: boolean
}

export default PeriodInput;
