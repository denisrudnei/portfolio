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

    if (!project) throw new Error('Project not found');

    return project;
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

  public static async createFiles(id: Project['id'], files: UploadedFile[]) {
    const project = await Project.findOne(id);
    if (!project) throw new Error('Project not found');
    const locations = await Promise.all(files.map(async (file) => {
      const params = {
        Bucket: process.env.BUCKET as string,
        Key: `project/${project.name}/${file.name}`,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      const { Location } = await S3.upload(params).promise();
      return Location;
    }));

    project.images = locations;

    await project.save();
    return project.images;
  }

  public static async edit(projectId: Project['id'], project: Project): Promise<Project> {
    const projectInDb = await Project.findOne(projectId);
    if (!projectInDb) throw new Error('Project not found');
    Object.assign(projectInDb, project);
    return projectInDb.save();
  }

  public static async remove(projectId: Project['id']) {
    const project = await Project.findOne({
      id: projectId,
    });

    if (!project) throw new Error('Project not found');

    const deleteImages = project.images.map((image) => {
      // image = https://bucket-name.amazonaws.com/project/projectName/fileName
      // nameAndFile = projectName/fileName
      // name = projectName
      // file = fileName

      const [, nameAndFile] = image.split('/project/');
      const [name, file] = nameAndFile.split('/');
      const key = `project/${name}/${file}`;

      return S3.deleteObject(
        {
          Bucket: process.env.BUCKET as string,
          Key: key,
        },
      ).promise();
    });

    await Promise.all(deleteImages);

    await Project.delete({
      id: projectId,
    });

    return true;
  }
}

export default ProjectService;
