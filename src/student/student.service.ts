import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentModel } from 'src/models/student.model';
import { Model } from 'mongoose';
import { CreateStudentInput, StudentInput } from './dto/create.student.input';
import { RequestService } from 'src/request.service';
import { UsersService } from 'src/user/users.service';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';
import { AuthService } from 'src/auth/auth.service';
import { StudentResponse, StudentsResponse } from './dto/student.response';
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
      section,
      dob,
      fatherName,
      motherName,
      usn,
    } = crateStudentInput;
    const { user, message, success } = await this.authService.register({
      firstName,
      lastName,
      phone,
      password: 'skit@123',
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
          section,
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

  async createMultipleStudents(
    createStudentInputs: CreateStudentInput[],
  ): Promise<StudentsResponse> {
    const results = new StudentsResponse();
    results.students = [];

    for (const createStudentInput of createStudentInputs) {
      const result = new StudentResponse();
      const {
        firstName,
        lastName,
        phone,
        email,
        gender,
        semester,
        admissionYear,
        parentOccupation,
        parentPhone,
        section,
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
      } = createStudentInput;

      const { user, message, success } = await this.authService.register({
        firstName,
        lastName,
        phone,
        password: 'skit@123',
        email,
        role: AllowedRole.st,
        gender,
      });

      if (!success || !user) {
        result.message = message;
        result.success = false;
        results.students.push(result.student);
        continue;
      }

      const student = await (
        await this.studentModel.create({
          user: user._id,
          semester,
          admissionYear,
          section,
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
        results.students.push(result.student);
        continue;
      }

      result.student = student;
      result.message = 'Student created successfully';
      result.success = true;
      results.students.push(result.student);
    }
    results.message = 'Students created successfully';
    results.success = true;
    results.students = results.students.filter((student) => student !== null);
    if (results.students.length === 0) {
      results.success = false;
      results.message = 'No students were created';
    } else {
      results.message = 'Students created successfully';
      results.success = true;
    }
    return results;
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

  async updateStudent(
    updateStudentInput: UpdateStudentInput,
  ): Promise<StudentResponse> {
    const response = new StudentResponse();
    const {
      _id,
      phone,
      email,
      anualIncome,
      category,
      course,
      currentAddress,
      dob,
      entranceExamMarks,
      fatherName,
      isEligible,
      motherName,
      parentOccupation,
      parentPhone,
      parmanentAddress,
      proctor,
      section,
      semester,
    } = updateStudentInput;
    const student = await this.studentModel
      .findOneAndUpdate(
        { _id: updateStudentInput._id },
        {
          anualIncome,
          category,
          course,
          currentAddress,
          dob,
          entranceExamMarks,
          fatherName,
          isEligible,
          motherName,
          parentOccupation,
          parentPhone,
          parmanentAddress,
          proctor,
          section,
          semester,
        },
        { new: true },
      )
      .populate(['user', 'department', 'proctor']);
    const user = await this.userService.updateUser(
      student.user._id.toString(),
      email,
      phone,
      AllowedRole.st,
    );
    student.user = user;
    if (!student) {
      response.message = 'Student not found';
      response.success = false;
      response.student = null;
      return response;
    }
    response.message = 'Student updated successfully';
    response.success = true;
    response.student = student;

    return response;
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
