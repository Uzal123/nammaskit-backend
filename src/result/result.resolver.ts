import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultService } from './result.service';
import { Result } from 'src/models/result.model';
import { CreateResultInput } from './dto/result.input';
import { SemResultResponse } from './dto/result.response';

@Resolver()
export class ResultResolver {
  constructor(private readonly resultService: ResultService) {}

  @Mutation(() => SemResultResponse)
  async createResult(
    @Args('createResultInput') createResultInput: CreateResultInput,
  ) {
    return this.resultService.createResult(createResultInput);
  }

  @Query(() => [Result])
  async getResultsByStudentId(@Args('studentId') studentId: string) {
    return this.resultService.getResultsByStudentId(studentId);
  }
}
