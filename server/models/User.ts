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
        return resolve(result);
      });
    });
  }

  @BeforeInsert()
  private hashPassword() {
    const user = this;
    const salt = bcrypt.genSaltSync(12);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
    });
  }
}

export default User;
