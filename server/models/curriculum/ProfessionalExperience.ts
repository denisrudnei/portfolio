import { Field, ObjectType, ID } from 'type-graphql';
import {
  Column, Entity, OneToOne, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn,
} from 'typeorm';

import Period from './Period';
import Curriculum from './Curriculum';

@ObjectType()
@Entity()
class ProfessionalExperience extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
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
  @OneToOne(() => Period, (period) => period.professionalExperience, { cascade: true })
  @JoinColumn({ name: 'period' })
  public period!: Period

  @ManyToOne(() => Curriculum, (curriculum) => curriculum.professionalExperience)
  public curriculum!: Curriculum
}

export default ProfessionalExperience;
