/* eslint-disable class-methods-use-this */
import {
  Arg, Mutation, Resolver, Ctx,
} from 'type-graphql';

import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import AuthService from '../services/AuthService';
import { CustomExpressContext } from '../types/CustomSession';

@Resolver(() => User)
class AuthResolver {
  @Mutation(() => User)
  public async Login(@Arg('email') email: string, @Arg('password') password: string, @Ctx() context: CustomExpressContext): Promise<User> {
    const user = await AuthService.login(email, password, context.req);
    const token = jwt.sign({
      email: user.email,
      name: user.name,
    }, process.env.JWT_TOKEN!);
    context.req.session!.authUser = user;
    context.res.setHeader('authorization', `Bearer ${token}`);
    return user;
  }

  @Mutation(() => User)
  public Register(@Arg('email') email: string, @Arg('name') name: string, @Arg('password') password: string): Promise<User> {
    const user = User.create({
      name,
      email,
      password,
    });
    return AuthService.create(user);
  }

  @Mutation(() => User)
  public Unblock(@Arg('token') token: string) {
    return AuthService.unBlock(token);
  }
}

export default AuthResolver;
