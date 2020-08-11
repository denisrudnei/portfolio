/* eslint-disable class-methods-use-this */
import { Query, Resolver } from 'type-graphql';

import Question from '../models/stackTypes/Question';
import StackOverflowService from '../services/StackOverflowService';

@Resolver()
class StackResolver {
  @Query(() => [Question])
  public async Questions(): Promise<Question[]> {
    return StackOverflowService.getQuestions();
  }
}

export default StackResolver;
