import User from '../models/User';

class AuthService {
  public static async login(email: string, password: string): Promise<User> {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new Error('User not found');
    const passwordIsValid = await user!.verifyPassword(password);
    if (!passwordIsValid) throw new Error('Invalid password');
    return user;
  }

  public static async create(toRegister: User): Promise<User> {
    const user = User.create();
    user.email = toRegister.email;
    user.name = toRegister.name;
    user.password = toRegister.password;
    const inDb = User.findOne();
    if (inDb) throw new Error('primary user already registered');
    return user.save();
  }
}

export default AuthService;
