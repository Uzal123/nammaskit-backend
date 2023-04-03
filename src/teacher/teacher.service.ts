import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherInput } from './dto/create.teacher.input';
import { RequestService } from 'src/request.service';
import { UsersService } from 'src/user/users.service';
import { Teacher, TeacherModel } from 'src/models/teacher.model';
import { AuthService } from 'src/auth/auth.service';
import { TeacherResponse } from './dto/teacher.response';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherModel>,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly requestService: RequestService,
  ) {}

  async createTeacher(
    crateTeacherInput: CreateTeacherInput,
  ): Promise<TeacherResponse> {
    const result = new TeacherResponse();
    const {
      firstName,
      lastName,
      phone,
      password,
      email,
      gender,
      address,
      department,
      designation,
      role,
      experience,
      qualification,
    } = crateTeacherInput;

    const { user, success, message } = await this.authService.register({
      firstName,
      lastName,
      phone,
      password,
      email,
      role,
      gender,
    });
    if (!success && !user) {
      result.message = message;
      result.success = false;
      return result;
    }

    const teacher = await (
      await this.teacherModel.create({
        user: user._id,
        address,
        department,
        designation,
        experience,
        qualification,
      })
    ).populate('user');

    if (!teacher) {
      result.message = 'Unable to create teacher';
      result.success = false;
      return result;
    } else {
      result.message = 'Teacher created successfully';
      result.success = true;
      result.teacher = teacher;
      return result;
    }
  }

  // Get all teachers
  async getAllTeachers() {
    const teachers = await this.teacherModel.find().populate('user');
    return teachers;
  }
}
