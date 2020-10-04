import { Field, InputType } from 'type-graphql';

@InputType()
class SiteInput {
  @Field()
  public name!: string

  @Field()
  public url!: string
}

export default SiteInput;
