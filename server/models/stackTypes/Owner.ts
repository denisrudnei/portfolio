/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, Entity, OneToMany, PrimaryColumn,
} from 'typeorm';

import Answer from './Answer';
import Question from './Question';
import StackComment from './StackComment';

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
