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

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentModel>,
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

  async createStudent(crateStudentInput: CreateStudentInput) {
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
    const user = await this.userService.create({
      firstName,
      lastName,
      phone,
      password,
      email,
      role: AllowedRole.st,
      gender,
    });
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

    return student;
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
}
