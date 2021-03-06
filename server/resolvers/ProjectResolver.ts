/* eslint-disable class-methods-use-this */
import {
  Arg, Authorized, ID, Mutation, Query, Resolver,
} from 'type-graphql';

import ProjectCreateInput from '../inputs/ProjectCreateInput';
import ProjectEditInput from '../inputs/ProjectEditInput';
import Project from '../models/Project';
import ProjectService from '../services/ProjectService';

@Resolver(() => Project)
class ProjectResolver {
  @Query(() => [Project])
  public Project(): Promise<Project[]> {
    return ProjectService.getAll();
  }

  @Query(() => Project)
  public GetOneProject(@Arg('url', () => String) url: Project['url']): Promise<Project> {
    return ProjectService.getOne(url);
  }

  @Mutation(() => Project)
  @Authorized('user')
  public CreateProject(@Arg('project', () => ProjectCreateInput) project: Project): Promise<Project> {
    return ProjectService.create(project);
  }

  @Mutation(() => Project)
  @Authorized('user')
  public EditProject(@Arg('id', () => ID) id: Project['id'], @Arg('project', () => ProjectEditInput) project: ProjectEditInput): Promise<Project> {
    return ProjectService.edit(id, project as Project);
  }

  @Mutation(() => Boolean)
  @Authorized('user')
  public DeleteProject(@Arg('id', () => ID) id: Project['id']): Promise<boolean> {
    return ProjectService.remove(id);
  }
}

export default ProjectResolver;
