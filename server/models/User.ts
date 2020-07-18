import {
  Entity, BaseEntity, Column, BeforeInsert, PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public email!: string

  @Column({ nullable: true })
  public description!: string

  @Column()
  public name!: string

  @Column()
  public password!: string

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
