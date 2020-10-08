import { differenceInYears } from 'date-fns';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import User from '../User';
import ProfessionalExperience from './ProfessionalExperience';
import Site from './Site';

@ObjectType()
@Entity()
class Curriculum extends BaseEntity {
  constructor(curriculum?: Partial<Curriculum>) {
    super();
    Object.assign(this, curriculum);
  }

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  public id!: number

  @Field({ nullable: true })
  @Column()
  public nationality!: string

  @Field({ nullable: true })
  @Column()
  public maritalStatus!: string

  @Field(() => Number)
  public get age(): number {
    const actualDate = new Date();
    const years = differenceInYears(this.birthday, actualDate);
    return Math.abs(years);
  }

  @Field(() => Date, { nullable: true })
  @Column()
  public birthday!: Date

  @Field({ nullable: true })
  @Column()
  public address!: string

  @Field({ nullable: true })
  @Column()
  public cellPhone!: string

  @Field({ nullable: true })
  @Column()
  public email!: string

  @Field(() => [Site])
  @OneToMany(() => Site, (site) => site.curriculum, { cascade: true })
  public sites!: Site[]

  @Field(() => User)
  @OneToOne(() => User, (user) => user.curriculum)
  public user!: User;

  @Field(() => [ProfessionalExperience])
  @OneToMany(() => ProfessionalExperience,
    (professionalExperience) => professionalExperience.curriculum, { cascade: true })
  public professionalExperience!: ProfessionalExperience[]
}

export default Curriculum;
