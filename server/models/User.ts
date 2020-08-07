import {
  Entity, BaseEntity, Column, BeforeInsert, PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, ID, Field } from 'type-graphql';
import bcrypt from 'bcrypt';

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

  @Field()
  @Column()
  public name!: string

  @Column()
  public password!: string

  @Field()
  @Column({ nullable: true })
  public image!: string

  public async verifyPassword(password: string): Promise<boolean> {
    const result = bcrypt.compareSync(password, this.password);
    if (!result) throw new Error('bad credentials');
    return result;
  }

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}

export default User;
