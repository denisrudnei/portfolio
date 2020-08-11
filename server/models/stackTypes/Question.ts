/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn,
} from 'typeorm';

import StackOverflowCache from '../StackOverflowCache';
import Answer from './Answer';
import Owner from './Owner';
import StackComment from './StackComment';

@ObjectType()
@Entity()
class Question extends BaseEntity {
  @Field(() => [String])
  @Column('text', { array: true })
  public tags!: string[];

  @Field(() => [StackComment], { nullable: true })
  @OneToMany(
    () => StackComment,
    (StackComment) => StackComment.question,
    { eager: true, cascade: true, nullable: true },
  )
  public comments?: StackComment[]

  @Field(() => Owner)
  @ManyToOne(() => Owner, (Owner) => Owner.questions, { eager: true, cascade: true })
  public owner!: Owner

  @Field(() => [Answer])
  @OneToMany(() => Answer, (Answer) => Answer.question, { eager: true, cascade: true })
  public answers!: Answer[]

  @Field(() => Int)
  @Column()
  public delete_vote_count!: number

  @Field(() => Int)
  @Column()
  public reopen_vote_count!: number

  @Field(() => Int)
  @Column()
  public close_vote_count!: number

  @Field()
  @Column()
  public is_answered!: boolean

  @Field(() => Int)
  @Column()
  public view_count!: number

  @Field(() => Int)
  @Column()
  public favorite_count!: number

  @Field(() => Int)
  @Column()
  public down_vote_count!: number

  @Field(() => Int)
  @Column()
  public up_vote_count!: number

  @Field(() => Int)
  @Column()
  public accepted_answer_id!: number

  @Field(() => Int)
  @Column()
  public answer_count!: number

  @Field(() => Int)
  @Column()
  public score!: number

  @Field()
  @Column()
  public last_activity_date!: number

  @Field()
  @Column()
  public creation_date!: number

  @Field(() => Int)
  @PrimaryColumn()
  public question_id!: number

  @Field()
  @Column()
  public link!: string

  @Field()
  @Column()
  public title!: string

  @Field()
  @Column()
  public body!: string

  @ManyToOne(() => StackOverflowCache)
  public cache!: StackOverflowCache
}

export default Question;
