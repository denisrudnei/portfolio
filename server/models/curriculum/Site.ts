import { ObjectType, Field, ID } from 'type-graphql';
import {
  PrimaryGeneratedColumn, Entity, Column, ManyToOne,
} from 'typeorm';
import Curriculum from './Curriculum';

@ObjectType()
@Entity()
class Site {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column()
  public name!: string

  @Field()
  @Column()
  public url!: string

  @ManyToOne(() => Curriculum, (curriculum) => curriculum.sites)
  public curriculum!: Curriculum
}

export default Site;
