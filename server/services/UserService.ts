import { UploadedFile } from 'express-fileupload';
import S3 from '../../plugins/S3';
import User from '../models/User';

class UserService {
  public static get(): Promise<User> {
    return new Promise((resolve, reject) => {
      User.findOne()
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  }

  public static setProfilePicture(file: UploadedFile) {
    return new Promise((resolve, reject) => {
      User.findOne({}).then((user) => {
        const params = {
          Bucket: process.env.BUCKET as string,
          Key: user!.id.toString(),
          Body: file.data,
        };
        S3.createBucket(() => {
          S3.upload(params, (err: Error) => {
            if (err) return reject(err);
            return resolve();
          });
        });
      });
    });
  }

  public static async edit(user: User): Promise<User> {
    const inDb = await User.findOne();
    inDb!.name = user.name;
    inDb!.description = user.description;
    return inDb!.save();
  }

  public static async getImage(): Promise<AWS.S3.Types.Body> {
    const users = await User.find();
    if (users.length <= 0) throw new Error('no image');
    const { id } = users[0];

    const result = await S3.getObject(
      {
        Bucket: process.env.BUCKET as string,
        Key: id.toString(),
      },
    ).promise();
    return result.Body!;
  }
}

export default UserService;
