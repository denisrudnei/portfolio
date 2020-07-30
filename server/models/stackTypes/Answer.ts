/* eslint-disable camelcase */
import { ObjectType, Field, Int } from 'type-graphql';
import {
  Entity, Column, OneToOne, PrimaryColumn, ManyToOne, BaseEntity,
} from 'typeorm';
import Owner from './Owner';
import Question from './Question';

@ObjectType()
@Entity()
class Answer extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  public answer_id!: number

  @Field(() => Owner)
  @ManyToOne(() => Owner, { eager: true, cascade: true })
  public owner!: Owner

  @ManyToOne(() => Question)
  public question!: Question

  @Field(() => Int)
  @Column()
  public down_vote_count!: number

  @Field(() => Int)
  @Column()
  public up_vote_count!:number

  @Field()
  @Column()
  public is_accepted!: boolean

  @Field(() => Int)
  @Column()
  public score!: number

  @Field()
  @Column({ nullable: true })
  public last_activity_date!: number

  @Field()
  @Column({ nullable: true })
  public last_edit_date!: number

  @Field()
  @Column()
  public creation_date!: number

  @Field(() => Int)
  @Column()
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
}

export default Answer;
