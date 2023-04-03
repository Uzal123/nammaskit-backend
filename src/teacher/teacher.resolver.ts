import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Teacher } from "src/models/teacher.model";
import { CreateTeacherInput } from "./dto/create.teacher.input";
import { TeacherService } from "./teacher.service";

// student resolver class
@Resolver()
export class TeacherResolver {
    constructor(private readonly teacherService: TeacherService) { }


    //get all teachers
    @Query(() => [Teacher])
    async getAllTeachers() {
        return this.teacherService.getAllTeachers();
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
    async createTeacher(@Args('createTeacherInput') createTeacherInput: CreateTeacherInput) {
        return this.teacherService.createTeacher(createTeacherInput);
    }

    //updateStudent mutation
    // @Mutation(() => Student)
    // async updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    //     return this.studentService.updateStudent(updateStudentInput);
    // }
}