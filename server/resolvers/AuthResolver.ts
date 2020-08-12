/* eslint-disable class-methods-use-this */
import {
  Arg, Mutation, Resolver, Ctx,
} from 'type-graphql';

import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import User from '../models/User';
import AuthService from '../services/AuthService';

@Resolver(() => User)
class AuthResolver {
  @Mutation(() => User)
  public Login(@Arg('email') email: string, @Arg('password') password: string, @Ctx() context: ExpressContext): Promise<User> {
    return AuthService.login(email, password, context.req);
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
