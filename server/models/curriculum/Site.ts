import { ObjectType, Field, ID } from 'type-graphql';
import {
  PrimaryGeneratedColumn, Entity, Column, ManyToOne, BaseEntity,
} from 'typeorm';

import Curriculum from './Curriculum';

@ObjectType()
@Entity()
class Site extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column()
  public name!: string

  @Field()
  @Column()
  public url!: string

  @ManyToOne(() => Curriculum, (curriculum) => curriculum.sites, { onDelete: 'CASCADE' })
  public curriculum!: Curriculum
}

export default Site;
