import {
  BaseEntity, Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

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
