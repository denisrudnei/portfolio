import { Field, ObjectType, ID } from 'type-graphql';
import {
  Column, Entity, OneToOne, PrimaryGeneratedColumn, BaseEntity, JoinColumn,
} from 'typeorm';

import ProfessionalExperience from './ProfessionalExperience';

@ObjectType()
@Entity()
class Period extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column()
  public start!: Date

  @Field()
  @Column()
  public finish?: Date

  @Field()
  @Column()
  public actual!: boolean

  @OneToOne(() => ProfessionalExperience, (professionalExperience) => professionalExperience.period, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'professionalExperience' })
  public professionalExperience!: ProfessionalExperience
}

export default Period;
