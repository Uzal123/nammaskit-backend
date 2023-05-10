import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Teacher } from 'src/models/teacher.model';
import { CreateTeacherInput } from './dto/create.teacher.input';
import { TeacherService } from './teacher.service';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { TeacherResponse } from './dto/teacher.response';
import { UpdateTeacherInput } from './dto/update.teacher.input';

// student resolver class
@Resolver()
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  //get all teachers
  @Query(() => [Teacher])
  async getAllTeachers() {
    return this.teacherService.getAllTeachers();
  }

  @Mutation(() => TeacherResponse)
  async updateTeacher(
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
  ) {
    return this.teacherService.updateTeacherById(updateTeacherInput);
  }

  @Mutation(() => TeacherResponse)
  async deleteTeacher(@Args('teacherId') teacherId: string) {
    return this.teacherService.deleteTeacherById(teacherId);
  }

  // totalTeachers query
  @Query(() => Number)
  async totalTeachers() {
    return this.teacherService.getTotalNumberOfTeachers();
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

  //getTeacherByUserId query
  @Query(() => TeacherResponse)
  async getTeacherByUserId(@Args('userId') userId: string) {
    return this.teacherService.getTeacherByUserId(userId);
  }

  //createStudent mutation
  @Mutation(() => TeacherResponse)
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
