import { UploadedFile } from 'express-fileupload';

import AWS from 'aws-sdk';
import S3 from '../../plugins/S3';
import User from '../models/User';
import Curriculum from '../models/curriculum/Curriculum';

class UserService {
  public static async get(): Promise<User> {
    const user = await User.findOne();
    return user!;
  }

  public static async setProfilePicture(file: UploadedFile): Promise<User> {
    const user = await User.findOne({});
    const params = {
      Bucket: process.env.BUCKET as string,
      Key: `about/${user!.id.toString()}`,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const uploadResult = await S3.upload(params).promise();
    user!.image = uploadResult.Location;
    return user!.save();
  }

  public static async edit(user: User): Promise<User> {
    const inDb = await User.findOne();
    inDb!.name = user.name;
    inDb!.description = user.description;
    if (user.curriculum) {
      inDb!.curriculum = new Curriculum(user.curriculum);
      await inDb!.curriculum!.save();
    }
    return inDb!.save();
  }

  public static async getImage(): Promise<AWS.S3.Types.Body> {
    const users = await User.find();
    if (users.length <= 0) throw new Error('no image');
    const { id } = users[0];

    const result = await S3.getObject(
      {
        Bucket: process.env.BUCKET as string,
        Key: `about/${id.toString()}`,
      },
    ).promise();
    return result.Body!;
  }
}

export default UserService;
