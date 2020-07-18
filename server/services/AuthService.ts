import User from '../models/User';

class AuthService {
  public static login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          email,
        },
      })
        .then((user) => {
          user!.verifyPassword(password).then(() => resolve(user)).catch((err) => reject(err));
        }).catch((err) => {
          reject(err);
        });
    });
  }

  public static create(toRegister: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = User.create();

      user.email = toRegister.email;
      user.name = toRegister.name;
      user.password = toRegister.password;
      User.findOne().then((inDb) => {
        if (inDb) { return reject(new Error('primary user already registered')); }
        return resolve(user.save());
      });
    });
  }
}

export default AuthService;
