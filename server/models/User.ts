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

  public verifyPassword(password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, result) => {
        if (err) return reject(err);
        if (!result) {
          return reject(new Error('bad credentials'));
        }
        return resolve(result);
      });
    });
  }

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}

export default User;
