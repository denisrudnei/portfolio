/* eslint-disable class-methods-use-this */
import { FieldResolver, Resolver, Root } from 'type-graphql';

import ProfessionalExperience from '../models/curriculum/ProfessionalExperience';
import Period from '../models/curriculum/Period';

@Resolver(() => ProfessionalExperience)
class ProfessionalExperienceResolver {
  @FieldResolver(() => Period)
  public async period(@Root() root: ProfessionalExperience) {
    const { period } = (await ProfessionalExperience.findOne(root.id, { relations: ['period'] }) as ProfessionalExperience);
    return period;
  }
}

export default ProfessionalExperienceResolver;
