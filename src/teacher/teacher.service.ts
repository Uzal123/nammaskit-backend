import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherInput } from './dto/create.teacher.input';
import { RequestService } from 'src/request.service';
import { UsersService } from 'src/user/users.service';
import { Teacher, TeacherModel } from 'src/models/teacher.model';
import { AuthService } from 'src/auth/auth.service';
import { TeacherResponse } from './dto/teacher.response';
import { User, UserModel } from 'src/models/user.model';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';

@Injectable()
export class TeacherService {
  userModel: any;
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherModel>,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
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

  //get teacher by user id
  async getTeacherByUserId(userId: string): Promise<TeacherResponse> {
    const result = new TeacherResponse();
    const teacher = await this.teacherModel
      .findOne({ user: userId })
      .populate('user');
    if (!teacher) {
      result.message = 'Teacher not found';
      result.success = false;
      return result;
    } else {
      result.message = 'Teacher found';
      result.success = true;
      result.teacher = teacher;
      return result;
    }
  }

  async findTeachersByAllowedRoles(
    allowedRoles: AllowedRole[],
  ): Promise<Teacher[]> {
    const teachers = await this.teacherModel
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $match: {
            'user.role': { $in: allowedRoles },
          },
        },
      ])
      .exec();
    return teachers;
  }
}

