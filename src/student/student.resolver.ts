import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from 'src/models/student.model';
import {
  CreateStudentInput,
  StudentInput,
  UpdateStudentInput,
} from './dto/create.student.input';
import { StudentService } from './student.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { StudentResponse } from './dto/student.response';
import { CreateResultInput } from 'src/result/dto/result.input';

// student resolver class
@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  //student query
  @Query(() => Student)
  async student(@Args('studentInput') studentInput: StudentInput) {
    return this.studentService.getStudent(studentInput);
  }

  //getStudentByUserId query
  @Query(() => StudentResponse)
  async getStudentByUserId(@Args('userId') userId: string) {
    return this.studentService.getStudentByUserId(userId);
  }

  //getAllStudents query
  @Query(() => [Student])
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Mutation(() => StudentResponse)
  async createResults(
    @Args('createResultInput') createResultInput: CreateResultInput,
  ) {
    return this.studentService.insertStudentResult(createResultInput);
  }

  //createStudent mutation
  @Mutation(() => StudentResponse)
  @UseGuards(RolesGuard)
  @Roles('ad', 'hod')
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  //updateStudent mutation
  @Mutation(() => Student)
  async updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.updateStudent(updateStudentInput);
  }
}
