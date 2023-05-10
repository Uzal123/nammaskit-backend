import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/department.input';
import { CreateSubjectInput } from './dto/subject.input';
import { DepartmentResponse } from './dto/department.response';
import { SubjectResponse } from './dto/subject.response';
import { SubjectsResponse } from './dto/subjects.response';
import { DepartmentsResponse } from './dto/all.department.response';
import { UpdateSubjectInput } from './dto/update.subject.input';

@Resolver()
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => DepartmentResponse)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ): Promise<DepartmentResponse> {
    return this.departmentService.createDepartment(createDepartmentInput);
  }

  @Mutation(() => DepartmentResponse)
  async deleteDepartment(
    @Args('departmentId') departmentId: string,
  ): Promise<DepartmentResponse> {
    return this.departmentService.deleteDepartment(departmentId);
  }

  @Mutation(() => SubjectResponse)
  async updateSubject(
    @Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput,
  ): Promise<SubjectResponse> {
    return this.departmentService.updateSubject(updateSubjectInput);
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

  @Query(() => Number)
  async getTotalDepartments(): Promise<number> {
    return this.departmentService.totalDepartments();
  }

  @Query(() => Number)
  async getTotalSubjects(): Promise<number> {
    return this.departmentService.totalSubjects();
  }

  @Query(() => SubjectsResponse)
  async getSubjects(
    @Args('department') department: string,
    @Args('semester') semester: number,
  ): Promise<SubjectsResponse> {
    return this.departmentService.getSubjectsInSemester(department, semester);
  }

  @Query(() => SubjectResponse)
  async getSubjectByCode(
    @Args('subjectCode') subjectCode: string,
  ): Promise<SubjectResponse> {
    return this.departmentService.getSubjectBySubjectCode(subjectCode);
  }

  @Mutation(() => SubjectResponse)
  async deleteSubject(
    @Args('subjectId') subjectId: string,
  ): Promise<SubjectResponse> {
    return this.departmentService.deleteSubject(subjectId);
  }

  @Query(() => DepartmentsResponse)
  async getDepartment(): Promise<DepartmentsResponse> {
    return this.departmentService.getDepartment();
  }
}
