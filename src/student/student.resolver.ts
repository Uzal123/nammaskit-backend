import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from 'src/models/student.model';
import { CreateStudentInput, StudentInput } from './dto/create.student.input';
import { StudentService } from './student.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { StudentResponse } from './dto/student.response';
import { CreateResultInput } from 'src/result/dto/result.input';
import { UpdateStudentInput } from './dto/update.student.input';

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

  //getStudents by proctorId query
  @Query(() => [Student])
  async getStudentsByProctorId(@Args('proctorId') proctorId: string) {
    return this.studentService.getStudentsByProctorId(proctorId);
  }

  //getStudentByUSN query
  @Query(() => StudentResponse)
  async getStudentByUSN(@Args('usn') usn: string) {
    return this.studentService.getStudentByUSN(usn);
  }

  //getAllStudents query
  @Query(() => [Student])
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  //totalStudents query
  @Query(() => Number)
  async totalStudents() {
    return this.studentService.getTotalStudents();
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
