import { differenceInYears } from 'date-fns';
import { ObjectType, Field } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import Site from './Site';
import User from '../User';
import ProfessionalExperience from './ProfessionalExperience';

@ObjectType()
@Entity()
class Curriculum extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Field({ nullable: true })
  public nationality!: string

  @Field({ nullable: true })
  public maritalStatus!: string

  @Field(() => Number)
  public get age(): number {
    const actualDate = new Date();
    const years = differenceInYears(this.birthday, actualDate);
    return years;
  }

  @Field(() => Date, { nullable: true })
  public birthday!: Date

  @Field({ nullable: true })
  public address!: string

  @Field({ nullable: true })
  public cellPhone!: string

  @Field({ nullable: true })
  public email!: string

  @Field(() => Site)
  public sites!: Site[]

  @Field(() => User)
  public user!: User;

  @Field(() => [ProfessionalExperience])
  public professionalExperience!: ProfessionalExperience[]
}

export default Curriculum;
