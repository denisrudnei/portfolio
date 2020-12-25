import bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Curriculum from './curriculum/Curriculum';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number

  private tempPassword!: string;

  @Column()
  @Field()
  public email!: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description!: string

  @Field(() => Curriculum, { nullable: true })
  @OneToOne(() => Curriculum, (curriculum) => curriculum.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curriculum' })
  public curriculum?: Curriculum

  @Field()
  @Column()
  public name!: string

  @Column()
  public password!: string

  @Field()
  @Column({ nullable: true })
  public image!: string

  @Column()
  public incorrectTries: number = 0

  @Column()
  public blocked: boolean = false;

  @Column()
  public unBlockToken: string = ''

  public async verifyPassword(password: string): Promise<boolean> {
    const result = bcrypt.compareSync(password, this.password);
    return result;
  }

  @AfterLoad()
  checkPasswordChanged() {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password && this.password !== this.tempPassword) {
      const salt = bcrypt.genSaltSync(12);
      this.password = bcrypt.hashSync(this.password, salt);
    }
    this.tempPassword = '';
  }
}

export default User;
