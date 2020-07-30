/* eslint-disable no-shadow */
import {
  Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import Question from './stackTypes/Question';

@Entity()
class StackOverflowCache extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public lastModifiedDate!: Date

  @OneToMany(() => Question, (Question) => Question.cache, { eager: true, cascade: true })
  public items!: Question[]
}

export default StackOverflowCache;
