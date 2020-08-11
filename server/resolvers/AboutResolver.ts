/* eslint-disable class-methods-use-this */
import { UploadedFile } from 'express-fileupload';
import { GraphQLUpload } from 'graphql-upload';
import {
  Arg, Authorized, Mutation, Query, Resolver,
} from 'type-graphql';

import UserEditInput from '../inputs/UserEditInput';
import User from '../models/User';
import UserService from '../services/UserService';

@Resolver()
class AboutResolver {
  @Query(() => User)
  public User(): Promise<User> {
    return UserService.get();
  }

  @Mutation(() => User)
  @Authorized('user')
  public SetProfilePicture(@Arg('file', () => GraphQLUpload) file: UploadedFile): Promise<User> {
    return UserService.setProfilePicture(file);
  }

  @Mutation(() => User)
  @Authorized('user')
  public EditUser(@Arg('user', () => UserEditInput) user: User): Promise<User> {
    return UserService.edit(user);
  }
}
export default AboutResolver;
