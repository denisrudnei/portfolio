import {
  BaseEntity, Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate,
} from 'typeorm';
import slugify from 'slugify';

@Entity()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string

  @Column()
  public description!: string

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

  @Column('text', { array: true })
  public images!: string[]
}

export default Project;
