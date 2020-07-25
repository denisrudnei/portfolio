import { UploadedFile } from 'express-fileupload';
import Project from '../models/Project';
import S3 from '../../plugins/S3';

class ProjectService {
  public static getAll(): Promise<Project[]> {
    return Project.find({});
  }

  public static async getOne(url: string): Promise<Project> {
    const project = await Project.findOne({
      where: {
        url,
      },
    });
    return project!;
  }

  public static create(project: Project) {
    const newProject = Project.create(project);
    return newProject.save();
  }

  public static getFile(id: string) {
    return new Promise((resolve, reject) => {
      S3.getObject(
        {
          Bucket: process.env.BUCKET!,
          Key: id,
        },
        (err: Error, result: AWS.S3.Types.GetObjectOutput) => {
          if (err) return reject(err);
          return resolve(result.Body);
        },
      );
    });
  }

  public static async createFile(id: Project['id'], file: UploadedFile) {
    const project = await Project.findOne(id);

    const params = {
      Bucket: process.env.BUCKET as string,
      Key: `project/${project!.name}/${file.name}`,
      Body: file.data,
    };

    const result = await S3.upload(params).promise();
    return result;
  }

  public static async edit(projectId: Project['id'], project: Project): Promise<Project> {
    const projectInDb = await Project.findOne(projectId);
    Object.assign(projectInDb, project);
    return projectInDb!.save();
  }

  public static async remove(projectId: Project['id']) {
    const project = await Project.findOne({
      id: projectId,
    });

    const deleteImages = project!.images.map((image) => new Promise((resolve, reject) => {
      S3.deleteObject(
        {
          Bucket: process.env.BUCKET as string,
          Key: `project/${project!.name}/${image}`,
        },
        (err: Error, data) => {
          if (err) return reject(err);
          return resolve(data);
        },
      );
    }));
    await Promise.all(deleteImages).then(() => {
      Project.delete({
        id: projectId,
      });
    });
    return true;
  }
}

export default ProjectService;
