import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherInput } from './dto/create.teacher.input';
import { RequestService } from 'src/request.service';
import { UsersService } from 'src/user/users.service';
import { Teacher, TeacherModel } from 'src/models/teacher.model';
import { AuthService } from 'src/auth/auth.service';
import { TeacherResponse } from './dto/teacher.response';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';
import { UpdateTeacherInput } from './dto/update.teacher.input';

@Injectable()
export class TeacherService {
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
      password: 'skit@teacher',
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
    ).populate(['user', 'department']);

    if (!teacher) {
      result.message = 'Unable to create teacher';
      result.success = false;
      return result;
    } else {
      result.message = 'Teacher created successfully';
      result.success = true;
      result.teacher = [teacher];
      return result;
    }
  }

  async createMultipleTeachers(
    createTeacherInputs: CreateTeacherInput[],
  ): Promise<TeacherResponse> {
    const results = new TeacherResponse();
    results.teacher = [];

    for (const createTeacherInput of createTeacherInputs) {
      const result = new TeacherResponse();
      const {
        firstName,
        lastName,
        phone,
        email,
        gender,
        address,
        department,
        designation,
        role,
        experience,
        qualification,
      } = createTeacherInput;

      const { user, success, message } = await this.authService.register({
        firstName,
        lastName,
        phone,
        password: 'skit@teacher',
        email,
        role,
        gender,
      });

      if (!success || !user) {
        result.message = message;
        result.success = false;
        results.teacher.push(result.teacher[0]);
        continue;
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
      ).populate(['user', 'department']);

      if (!teacher) {
        result.message = 'Teacher not created';
        result.success = false;
        results.teacher.push(result.teacher[0]);
        continue;
      }

      result.teacher = [teacher];
      result.message = 'Teacher created successfully';
      result.success = true;
      results.teacher.push(result.teacher[0]);
    }
    results.message = 'Teachers created successfully';
    results.success = true;
    results.teacher = results.teacher.filter((teacher) => teacher !== null);
    if (results.teacher.length === 0) {
      results.success = false;
      results.message = 'No Teacher were created';
    } else {
      results.message = 'Teachers created successfully';
      results.success = true;
    }
    return results;
  }

  //update teacher by id
  async updateTeacherById(
    updateTeacherInput: UpdateTeacherInput,
  ): Promise<TeacherResponse> {
    const result = new TeacherResponse();
    const {
      _id,
      address,
      designation,
      email,
      experience,
      phone,
      qualification,
      role,
    } = updateTeacherInput;
    const teacher = await this.teacherModel
      .findByIdAndUpdate(
        _id,
        { address, designation, experience, qualification },
        { new: true },
      )
      .populate(['user', 'department']);
    if (!teacher) {
      result.message = 'Teacher not found';
      result.success = false;
      return result;
    } else {
      const user = await this.userService.updateUser(
        teacher.user._id.toString(),
        email,
        phone,
        role,
      );
      if (user) {
        teacher.user = user;
        result.message = 'Teacher updated successfully';
        result.success = true;
        result.teacher = [teacher];
        return result;
      } else {
        result.message = 'Error while Updating';
        result.success = false;
        result.teacher = null;
      }
    }
  }

  // delete teacher by id
  async deleteTeacherById(id: string): Promise<TeacherResponse> {
    const result = new TeacherResponse();
    const teacher = await this.teacherModel.findByIdAndDelete(id);

    if (!teacher) {
      result.message = 'Teacher not found';
      result.success = false;
      return result;
    } else {
      const userId = teacher.user._id;
      await this.userService.findByIdAndDelete(userId.toString());

      result.message = 'Teacher deleted successfully';
      result.success = true;
      return result;
    }
  }

  // get total number of teachers
  async getTotalNumberOfTeachers(): Promise<number> {
    const totalTeachers = await this.teacherModel.countDocuments();
    return totalTeachers;
  }

  // Get all teachers
  async getAllTeachers() {
    const teachers = await this.teacherModel
      .find()
      .populate(['user', 'department']);
    return teachers;
  }

  //get teacher by user id
  async getTeacherByUserId(userId: string): Promise<TeacherResponse> {
    const result = new TeacherResponse();
    const teacher = await this.teacherModel
      .findOne({ user: userId })
      .populate(['user', 'department']);
    if (!teacher) {
      result.message = 'Teacher not found';
      result.success = false;
      result.teacher = null;
      return result;
    } else {
      result.message = 'Teacher found';
      result.success = true;
      result.teacher = [teacher];
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

  async findTeachersByAllowedRolesAndDepartment(
    allowedRoles: AllowedRole[],
    departmentId: string,
  ): Promise<TeacherResponse> {
    const result = new TeacherResponse();
    const teachers: Teacher[] = await this.teacherModel
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
            // department: departmentId,
          },
        },
      ])
      .exec();
    if (!teachers) {
      result.message = 'Teachers not found';
      result.success = false;
      result.teacher = null;
      return result;
    } else {
      result.message = 'Teachers found';
      result.success = true;
      result.teacher = teachers;
      return result;
    }
  }
}
