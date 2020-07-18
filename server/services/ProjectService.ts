import { UploadedFile } from 'express-fileupload';
import Project from '../models/Project';
import S3 from '../../plugins/S3';

class ProjectService {
  public static getAll(): Promise<Project[]> {
    return Project.find({});
  }

  public static getOne(url: string) {
    return Project.findOne(
      {
        where: {
          url,
        },
      },
    );
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

  public static createFile(id: Project['id'], file: UploadedFile) {
    return new Promise((resolve, reject) => {
      S3.createBucket(() => {
        const params = {
          Bucket: process.env.BUCKET as string,
          Key: `${id}/${file.name}`,
          Body: file.data,
        };

        S3.upload(params, (err: Error, data: AWS.S3.Types.UploadPartOutput) => {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    });
  }

  public static async edit(projectId: Project['id'], project: Project): Promise<Project> {
    const projectIdDb = await Project.findOne(projectId);
    projectIdDb!.name = project.name;
    projectIdDb!.description = project.description;
    return projectIdDb!.save();
  }

  public static async remove(projectId: Project['id']) {
    const project = await Project.findOne({
      id: projectId,
    });

    const deleteImages = project!.images.map((image) => new Promise((resolve, reject) => {
      S3.deleteObject(
        {
          Bucket: process.env.BUCKET as string,
          Key: `${projectId}/${image}`,
        },
        (err: Error, data) => {
          if (err) return reject(err);
          return resolve(data);
        },
      );
    }));
    Promise.all(deleteImages).then(() => {
      Project.delete({
        id: projectId,
      }).then(() => {
      });
    });
  }
}

export default ProjectService;
