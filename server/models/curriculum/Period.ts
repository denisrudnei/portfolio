import { Field, ObjectType } from 'type-graphql';
import {
  Column, Entity, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import ProfessionalExperience from './ProfessionalExperience';

@ObjectType()
@Entity()
class Period {
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

  @OneToOne(() => ProfessionalExperience, (professionalExperience) => professionalExperience.period)
  public professionalExperience!: ProfessionalExperience
}

export default Period;
