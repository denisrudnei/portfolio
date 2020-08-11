import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
class StackOverflowInfo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number

  @Field()
  @Column()
  public userId!: string

  @Field()
  @Column()
  public siteUrl!: string
}

export default StackOverflowInfo;
