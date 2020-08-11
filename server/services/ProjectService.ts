import { UploadedFile } from 'express-fileupload';

import S3 from '../../plugins/S3';
import Project from '../models/Project';

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

  public static async getFile(id: string) {
    const { Body } = await S3.getObject(
      {
        Bucket: process.env.BUCKET!,
        Key: id,
      },
    ).promise();
    return Body;
  }

  public static async createFile(id: Project['id'], file: UploadedFile) {
    const project = await Project.findOne(id);

    const params = {
      Bucket: process.env.BUCKET as string,
      Key: `project/${project!.name}/${file.name}`,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read',
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

    const deleteImages = project!.images.map((image) => S3.deleteObject(
      {
        Bucket: process.env.BUCKET as string,
        Key: `project/${project!.name}/${image}`,
      },
    ).promise());
    await Promise.all(deleteImages).then(() => {
      Project.delete({
        id: projectId,
      });
    });
    return true;
  }
}

export default ProjectService;
