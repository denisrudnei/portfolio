/* eslint-disable class-methods-use-this */
import { UploadedFile } from 'express-fileupload';
import { GraphQLUpload } from 'graphql-upload';
import {
  Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root,
} from 'type-graphql';

import UserEditInput from '../inputs/UserEditInput';
import User from '../models/User';
import UserService from '../services/UserService';

@Resolver(() => User)
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

  @FieldResolver()
  public async curriculum(@Root() root: User) {
    const { curriculum } = (await User.findOne(root.id, {
      relations: ['curriculum'],
    }) as User);
    return curriculum;
  }

  @Mutation(() => User)
  @Authorized('user')
  public EditUser(@Arg('user', () => UserEditInput) user: User): Promise<User> {
    return UserService.edit(user);
  }
}
export default AboutResolver;
