import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Student } from "src/models/student.model";
import { CreateStudentInput, StudentInput, UpdateStudentInput } from "./dto/create.student.input";
import { StudentService } from "./student.service";

// student resolver class
@Resolver()
export class StudentResolver {
    constructor(private readonly studentService: StudentService) { }

    //student query
    @Query(() => Student)
    async student(@Args('studentInput') studentInput: StudentInput) {
        return this.studentService.getStudent(studentInput);
    }

    //getStudentByUserId query
    @Query(() => Student)
    async getStudentByUserId(@Args('userId') userId: string) {
        return this.studentService.getStudentByUserId(userId);
    }

    //getAllStudents query
    @Query(() => [Student])
    async getAllStudents() {
        return this.studentService.getAllStudents();
    }

    //createStudent mutation
    @Mutation(() => Student)
    async createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
        return this.studentService.createStudent(createStudentInput);
    }

    //updateStudent mutation
    @Mutation(() => Student)
    async updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
        return this.studentService.updateStudent(updateStudentInput);
    }
}