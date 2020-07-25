/* eslint-disable class-methods-use-this */
import { Resolver, Mutation, Arg } from 'type-graphql';
import AuthService from '../services/AuthService';
import User from '../models/User';

@Resolver(() => User)
class AuthResolver {
  @Mutation(() => User)
  public Login(@Arg('email') email: string, @Arg('password') password: string): Promise<User> {
    return AuthService.login(email, password);
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
}

export default AuthResolver;
