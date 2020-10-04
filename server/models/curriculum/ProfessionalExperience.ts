import { Field, ObjectType } from 'type-graphql';
import {
  Column, Entity, OneToOne, PrimaryGeneratedColumn, BaseEntity,
} from 'typeorm';
import Period from './Period';

@ObjectType()
@Entity()
class ProfessionalExperience extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Field()
  @Column()
  public local!: string

  @Field()
  @Column()
  public role!: string

  @Field()
  @Column()
  public mainActivities!: string

  @Field(() => Period)
  @OneToOne(() => Period, (period) => period.professionalExperience)
  public period!: Period
}

export default ProfessionalExperience;
