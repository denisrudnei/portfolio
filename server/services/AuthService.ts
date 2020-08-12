import { Request } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import EmailService from './EmailService';

type signedToken = {
  date: Date,
  email: string
};

class AuthService {
  public static async login(email: string, password: string, req: Request): Promise<User> {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new Error('User not found');

    if (user.blocked || user.incorrectTries >= 3) throw new Error('User blocked by many incorrect password tries');

    const passwordIsValid = await user.verifyPassword(password);

    if (!passwordIsValid) {
      user.incorrectTries += 1;

      if (user.incorrectTries >= 3) {
        user.blocked = true;

        const token = await this.setUnBlockToken(user.email);
        user.unBlockToken = token;

        EmailService.sendEmailToken(user, token, req);
        throw new Error('User blocked by many incorrect password tries');
      }
      await user.save();
      throw new Error('Invalid password');
    }

    return user;
  }

  public static async unBlock(token: string): Promise<User> {
    const { email } = jwt.verify(token, process.env.JWT_TOKEN as string) as signedToken;

    const user = await User.findOne({
      email,
    });

    if (!user) throw new Error('User not found');

    if (user.unBlockToken !== token) throw new Error('Incorrect token provided');

    user.blocked = false;
    user.incorrectTries = 0;
    await user.save();

    return user;
  }

  public static async setUnBlockToken(email: string): Promise<string> {
    const user = await User.findOne({
      email,
    });

    if (!user) throw new Error('User not found');

    user.unBlockToken = jwt.sign({
      date: new Date(),
      email: user.email,
    }, process.env.JWT_TOKEN as string);

    await user.save();
    return user.unBlockToken;
  }

  public static async create(toRegister: User): Promise<User> {
    const user = User.create();

    user.email = toRegister.email;
    user.name = toRegister.name;
    user.password = toRegister.password;

    const inDb = await User.findOne();

    if (inDb) throw new Error('primary user already registered');

    return user.save();
  }
}

export default AuthService;
