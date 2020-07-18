import {
  BaseEntity, Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class StackOverflowInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public userId!: string

  @Column()
  public siteUrl!: string
}

export default StackOverflowInfo;
