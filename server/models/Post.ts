import {
  Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert,
} from 'typeorm';
import { format } from 'date-fns';
import slugify from 'slugify';

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ nullable: false })
  public title!: string

  @Column({ nullable: false })
  public content!: string

  @Column()
  public created: Date = new Date()

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
