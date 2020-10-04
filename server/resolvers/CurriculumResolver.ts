/* eslint-disable class-methods-use-this */
import { Resolver, FieldResolver, Root } from 'type-graphql';
import Curriculum from '../models/curriculum/Curriculum';
import Site from '../models/curriculum/Site';
import ProfessionalExperience from '../models/curriculum/ProfessionalExperience';

@Resolver(() => Curriculum)
class CurriculumResolver {
  @FieldResolver(() => [ProfessionalExperience])
  public async professionalExperience(@Root() root: Curriculum) {
    const { professionalExperience } = (await Curriculum.findOne(root.id, {
      relations: ['professionalExperience'],
    }) as Curriculum);
    return professionalExperience;
  }

  @FieldResolver(() => [Site])
  public async sites(@Root() root: Curriculum) {
    const { sites } = (await Curriculum.findOne(root.id, {
      relations: ['sites'],
    }) as Curriculum);
    return sites;
  }
}

export default CurriculumResolver;
