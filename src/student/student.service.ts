import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentModel } from 'src/models/student.model';
import { Model } from 'mongoose';
import { CreateStudentInput, StudentInput } from './dto/create.student.input';
import { RequestService } from 'src/request.service';
import { UsersService } from 'src/user/users.service';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';
import { AuthService } from 'src/auth/auth.service';
import { StudentResponse } from './dto/student.response';
import { CreateResultInput } from 'src/result/dto/result.input';
import { UpdateStudentInput } from './dto/update.student.input';

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

  async getStudentById(studentId: string): Promise<StudentResponse> {
    const result = new StudentResponse();
    const student = await this.studentModel
      .findById(studentId)
      .populate(['user', 'department', 'proctor']);
    if (!student) {
      result.message = 'Student not found';
      result.success = false;
      result.student = null;
      return result;
    }
    result.message = 'Student found';
    result.success = true;
    result.student = student;
    return result;
  }

  async updateStudentProctor(studentId: string, proctorId: string) {
    const student = await this.studentModel
      .findOneAndUpdate(
        { _id: studentId },
        { proctor: proctorId },
        { new: true },
      )
      .populate('user');
    return student;
  }

  async updateStudentsProctor(studentIds: string[], proctorId: string) {
    const students = await this.studentModel
      .updateMany(
        { _id: { $in: studentIds } },
        { proctor: proctorId },
        { new: true },
      )
      .populate('user');
    return students;
  }

  async getStudentByUserId(userId: string): Promise<StudentResponse> {
    const result = new StudentResponse();
    const student = await this.studentModel
      .findOne({ user: userId })
      .populate(['user', 'department', 'proctor']);
    if (!student) {
      result.message = 'Student not found';
      result.success = false;
      result.student = null;
      return result;
    }
    result.message = 'Student found';
    result.success = true;
    result.student = student;
    return result;
  }

  async getTotalStudents(): Promise<number> {
    const totalStudents = await this.studentModel.countDocuments();
    return totalStudents;
  }

  async getStudentByUSN(usn: string): Promise<StudentResponse> {
    const result = new StudentResponse();
    const student = await this.studentModel
      .findOne({ usn: usn })
      .populate(['user', 'department', 'proctor']);
    if (!student) {
      result.message = 'Student not found';
      result.success = false;
      result.student = null;
      return result;
    }
    result.message = 'Student found';
    result.success = true;
    result.student = student;
    return result;
  }

  async getAllStudents(): Promise<Student[]> {
    const students = await this.studentModel
      .find()
      .populate(['user', 'department', 'proctor']);
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
      ).populate(['user', 'department', 'proctor']);
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

  async addProctortoStudents(studentIds: string[], proctorId: string) {
    const students = await this.studentModel.updateMany(
      { _id: { $in: studentIds } },
      { proctor: proctorId },
    );
    return students;
  }

  async getStudentsByProctorId(proctorId: string) {
    const students = await this.studentModel
      .find({ proctor: proctorId })
      .populate('user');
    return students;
  }

  async getStudentsByDepartment(department: string) {
    const students = await this.studentModel
      .find({ department: department })
      .populate('user');
    return students;
  }

  async updateStudent(updateStudentInput: UpdateStudentInput) {
    const student = await this.studentModel
      .findOneAndUpdate(
        { _id: updateStudentInput._id },
        {
          ...updateStudentInput,
        },
        { new: true },
      )
      .populate(['user', 'department', 'proctor']);
    return student;
  }

  //delete student
  async deleteStudentById(id: string): Promise<StudentResponse> {
    const result = new StudentResponse();
    const student = await this.studentModel
      .findByIdAndDelete(id)
      .populate(['user', 'department', 'proctor']);

    if (!student) {
      result.message = 'Student not found';
      result.success = false;
      return result;
    } else {
      const userId = student.user._id.toString();
      await this.userService.findByIdAndDelete(userId);

      result.message = 'Student deleted successfully';
      result.success = true;
      return result;
    }
  }
}
