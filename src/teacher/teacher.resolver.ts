import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Teacher } from 'src/models/teacher.model';
import { CreateTeacherInput } from './dto/create.teacher.input';
import { TeacherService } from './teacher.service';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';

// student resolver class
@Resolver()
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  //get all teachers
  @Query(() => [Teacher])
  async getAllTeachers() {
    return this.teacherService.getAllTeachers();
  }

  @Query(() => [Teacher])
  async getTeachersByRole(
    @Args('allowedRoles', { type: () => [AllowedRole] })
    allowedRoles: AllowedRole[],
  ) {
    const teachers = await this.teacherService.findTeachersByAllowedRoles(
      allowedRoles,
    );
    return teachers;
  }

  //student query
  // @Query(() => Student)
  // async student(@Args('studentInput') studentInput: StudentInput) {
  //     return this.studentService.getStudent(studentInput);
  // }

  //getStudentByUserId query
  // @Query(() => Student)
  // async getStudentByUserId(@Args('userId') userId: string) {
  //     return this.studentService.getStudentByUserId(userId);
  // }

  //getAllStudents query
  // @Query(() => [Student])
  // async getAllStudents() {
  //     return this.studentService.getAllStudents();
  // }

  //createStudent mutation
  @Mutation(() => Teacher)
  async createTeacher(
    @Args('createTeacherInput') createTeacherInput: CreateTeacherInput,
  ) {
    return this.teacherService.createTeacher(createTeacherInput);
  }

  //updateStudent mutation
  // @Mutation(() => Student)
  // async updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
  //     return this.studentService.updateStudent(updateStudentInput);
  // }
}
