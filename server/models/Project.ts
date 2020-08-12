import slugify from 'slugify';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number

  @Field()
  @Column()
  public name!: string

  @Field()
  @Column()
  public description!: string

  @Field()
  @Column({ nullable: true })
  public url!: string

  @BeforeInsert()
  @BeforeUpdate()
  public setUrl() {
    this.url = slugify(this.name, {
      replacement: '-',
      lower: true,
    });
  }

  @Field(() => [String])
  @Column('text', { array: true })
  public images: string[] = []
}

export default Project;
