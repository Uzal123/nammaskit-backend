import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultService } from './result.service';
import { Result } from 'src/models/result.model';
import { CreateResultInput } from './dto/result.input';
import { ResultResponse } from './dto/result.response';
import { ResultsResponse } from './dto/all.result.response';
import { ResultType } from 'src/common/dto/result.type.enum';
import { UpdateResultInput } from './dto/update.result.input';
import { CreateAttendanceInput } from './dto/attendance.input';
import { AttendanceResponse } from './dto/attendance.response';
import { UpdateAttendanceInput } from './dto/update.attendance.input';
import { AttendancesResponse } from './dto/attendances.response';

@Resolver()
export class ResultResolver {
  constructor(private readonly resultService: ResultService) {}

  //   @Mutation(() => ResultResponse)
  //   async createResult(
  //     @Args('createResultInput') createResultInput: CreateResultInput,
  //   ) {
  //     return this.resultService.createResult(createResultInput);
  //   }

  @Query(() => ResultsResponse)
  async getResultsByStudentId(@Args('studentId') studentId: string) {
    return this.resultService.getResultsByStudentId(studentId);
  }

  @Mutation(() => ResultsResponse)
  async createResults(
    @Args('createResultInput', { type: () => [CreateResultInput] })
    createResultInput: CreateResultInput[],
  ) {
    return this.resultService.createMultipleResults(createResultInput);
  }

  @Mutation(() => ResultResponse)
  async updateResult(
    @Args('updateResultInput', { type: () => UpdateResultInput })
    updateResultInput: UpdateResultInput,
  ) {
    return this.resultService.updateResult(updateResultInput);
  }

  @Mutation(() => ResultResponse)
  async deleteResult(@Args('resultId') resultId: string) {
    return this.resultService.deleteResult(resultId);
  }

  @Query(() => ResultsResponse)
  async getResultsByresultTypeAndSemester(
    @Args('resultType', { type: () => [ResultType] }) resultType: ResultType[],
    @Args('semester') semester: number,
    @Args('studentId') studentId: string,
  ) {
    return this.resultService.getResultsByStudentIdAndResultTypeAndSemester(
      studentId,
      resultType,
      semester,
    );
  }

  @Mutation(() => AttendanceResponse)
  async createAttendance(
    @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput,
  ) {
    return this.resultService.createAttendance(createAttendanceInput);
  }

  // update attendance
  @Mutation(() => AttendanceResponse)
  async updateAttendance(
    @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput,
  ) {
    return this.resultService.updateByAttendanceId(updateAttendanceInput);
  }

  // delete attendance
  @Mutation(() => AttendanceResponse)
  async deleteAttendance(@Args('attendanceId') attendanceId: string) {
    return this.resultService.deleteAttendance(attendanceId);
  }

  // get attendance by student id
  @Query(() => AttendancesResponse)
  async getAttendancesByStudentId(
    @Args('studentId') studentId: string,
    @Args('attendanceFor', { type: () => ResultType })
    attendanceFor: ResultType,
  ) {
    return this.resultService.getAttendanceByStudentIdAndAttendanceFor(
      studentId,
      attendanceFor,
    );
  }
}
