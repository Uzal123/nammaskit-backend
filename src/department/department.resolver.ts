import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/department.input';
import { CreateSubjectInput } from './dto/subject.input';
import { DepartmentResponse } from './dto/department.response';
import { SubjectResponse } from './dto/subject.response';
import { SubjectsResponse } from './dto/subjects.response';
import { DepartmentsResponse } from './dto/all.department.response';

@Resolver()
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => DepartmentResponse)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ): Promise<DepartmentResponse> {
    return this.departmentService.createDepartment(createDepartmentInput);
  }

  @Mutation(() => SubjectResponse)
  async createSubject(
    @Args('createSubjectInput') createSubjectInput: CreateSubjectInput,
  ): Promise<SubjectResponse> {
    return this.departmentService.createSubjectInSemester(createSubjectInput);
  }

  @Mutation(() => SubjectsResponse)
  async createSubjects(
    @Args({ name: 'createSubjectInput', type: () => [CreateSubjectInput] })
    createSubjectInput: CreateSubjectInput[],
  ): Promise<SubjectsResponse> {
    return this.departmentService.createMultipleSubjectsInSemester(
      createSubjectInput,
    );
  }

  @Query(() => SubjectsResponse)
  async getSubjects(
    @Args('department') department: string,
    @Args('semester') semester: number,
  ): Promise<SubjectsResponse> {
    return this.departmentService.getSubjectsInSemester(department, semester);
  }

  @Query(() => DepartmentsResponse)
  async getDepartment(): Promise<DepartmentsResponse> {
    return this.departmentService.getDepartment();
  }
}
