import bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToOne,
} from 'typeorm';
import Curriculum from './curriculum/Curriculum';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  @Field()
  public email!: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description!: string

  @Field(() => Curriculum, { nullable: true })
  @OneToOne(() => Curriculum, (curriculum) => curriculum.user)
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

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}

export default User;
