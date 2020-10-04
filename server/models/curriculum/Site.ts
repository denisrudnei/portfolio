import { ObjectType, Field } from 'type-graphql';
import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@ObjectType()
@Entity()
class Site {
  @Field()
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column()
  public name!: string

  @Field()
  @Column()
  public url!: string
}

export default Site;
