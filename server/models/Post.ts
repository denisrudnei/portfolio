import {
  Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { format } from 'date-fns';
import slugify from 'slugify';

@Entity()
@ObjectType()
class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number

  @Field()
  @Column({ nullable: false })
  public title!: string

  @Field()
  @Column({ nullable: false })
  public content!: string

  @Field()
  @Column()
  public created: Date = new Date()

  @Field()
  @Column({ nullable: true })
  public url!: string

  @BeforeInsert()
  setUrl() {
    const title = slugify(this.title, {
      replacement: '-',
    });
    this.url = `${format(this.created, 'yyyy/MM/dd')}/${title}`;
  }
}

export default Post;
