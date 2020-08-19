/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, Entity, ManyToOne, PrimaryColumn,
} from 'typeorm';

import Owner from './Owner';
import Question from './Question';

@ObjectType()
@Entity()
class StackComment extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  public comment_id!: number

  @Field(() => Owner)
  @ManyToOne(() => Owner, { eager: true, cascade: true })
  public owner!: Owner

  @Field()
  @Column()
  public edited!: boolean

  @Field(() => Int)
  @Column()
  public score!: number

  @Field()
  @Column()
  public post_type!: string

  @Field()
  @Column()
  public creation_date!: number

  @Field(() => Int)
  @Column({ name: 'comment_post_id' })
  public post_id!: number

  @Field()
  @Column()
  public link!: string

  @Field()
  @Column()
  public body!: string

  @ManyToOne(() => Question, (Question) => Question.comments, { onDelete: 'CASCADE' })
  public question!: Question
}

export default StackComment;
