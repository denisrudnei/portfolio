/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { ObjectType, Field, Int } from 'type-graphql';
import {
  Entity, Column, PrimaryColumn, BaseEntity, OneToMany,
} from 'typeorm';
import Question from './Question';
import StackComment from './StackComment';
import Answer from './Answer';

@ObjectType()
@Entity()
class Owner extends BaseEntity {
  @PrimaryColumn({ name: 'owner_id' })
  @Field(() => Int)
  public user_id!: number;

  @Column()
  @Field(() => Int)
  public reputation!: number;

  @Column()
  @Field()
  public user_type!: string;

  @Column()
  @Field()
  public profile_image!: string;

  @Column()
  @Field()
  public display_name!: string;

  @Column()
  @Field()
  public link!: string;

  @OneToMany(() => Question, (Question) => Question.owner)
  public questions!: Question[]

  @OneToMany(() => StackComment, (StackComment) => StackComment.owner)
  public comments!: StackComment[]

  @OneToMany(() => Answer, (Answer) => Answer.owner)
  public answers!: Answer[]
}

export default Owner;
