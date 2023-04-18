import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentModel } from 'src/models/student.model';
import { Model } from 'mongoose';
import {
  CreateStudentInput,
  StudentInput,
  UpdateStudentInput,
} from './dto/create.student.input';
import { RequestService } from 'src/request.service';
import { UsersService } from 'src/user/users.service';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';
import { AuthService } from 'src/auth/auth.service';
import { StudentResponse } from './dto/student.response';
import { CreateResultInput } from 'src/result/dto/result.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentModel>,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly requestService: RequestService,
  ) {}

  async getStudent(studentInput: StudentInput) {
    const student = await this.studentModel
      .find({ user: studentInput._id })
      .populate('user');
    return student;
  }

  async getStudentByUserId(userId: string) {
    const student = await this.studentModel
      .findOne({ user: userId })
      .populate('user');
    return student;
  }

  async getAllStudents() {
    const students = await this.studentModel.find().populate('user');
    return students;
  }

  async createStudent(
    crateStudentInput: CreateStudentInput,
  ): Promise<StudentResponse> {
    const result = new StudentResponse();
    const {
      firstName,
      lastName,
      phone,
      password,
      email,
      gender,
      semester,
      admissionYear,
      parentOccupation,
      parentPhone,
      parmanentAddress,
      anualIncome,
      currentAddress,
      course,
      entranceExamMarks,
      category,
      department,
      dob,
      fatherName,
      motherName,
      usn,
    } = crateStudentInput;
    const { user, message, success } = await this.authService.register({
      firstName,
      lastName,
      phone,
      password,
      email,
      role: AllowedRole.st,
      gender,
    });

    if (!success && !user) {
      result.message = message;
      result.success = false;
      return result;
    }

    if (success && user) {
      const student = await (
        await this.studentModel.create({
          user: user._id,
          semester,
          admissionYear,
          parentOccupation,
          parentPhone,
          parmanentAddress,
          anualIncome,
          currentAddress,
          course,
          entranceExamMarks,
          category,
          department,
          dob,
          fatherName,
          motherName,
          usn,
          phone,
        })
      ).populate('user');
      if (!student) {
        result.message = 'Student not created';
        result.success = false;
        result.student = null;
        return result;
      } else {
        result.student = student;
        result.message = 'Student created successfully';
        result.success = true;
      }
    }
    return result;
  }

  async updateStudent(updateStudentInput: UpdateStudentInput) {
    const student = await this.studentModel.findOneAndUpdate(
      { _id: updateStudentInput._id },
      {
        ...updateStudentInput,
      },
      { new: true },
    );
    return student;
  }

  // insert student result
  async insertStudentResult(
    createResultInput: CreateResultInput,
  ): Promise<StudentResponse> {
    const { studentId, results } = createResultInput;

    const student = await this.studentModel
      .findByIdAndUpdate(
        studentId,
        {
          $push: {
            semesterResults: {
              $each: results,
            },
          },
        },
        { new: true },
      )

    // Return the updated student
    const result = new StudentResponse();
    result.student = student;
    result.message = 'Student result inserted successfully';
    result.success = true;
    return result;
  }
}
