import { AllowedRole } from './../common/dto/allowed.roles.enum';
import { UserResponse } from '../common/dto/user.response';
import { RequestService } from '../request.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from '../models/user.model';
import { CreateUserInput } from './dto/create.user.input';
import { ProfileService } from 'src/profile/profile.service';
import * as jwt from 'jsonwebtoken';
import { MyDeptSemResponse } from './dto/response.mydeptsem';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';
// import { StudentResponse } from 'src/student/dto/student.response';
// import { TeacherResponse } from 'src/teacher/dto/teacher.response';
// import { StudentService } from 'src/student/student.service';
// import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class UsersService {
  generateSalt() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserModel>,
    private readonly requestService: RequestService, // private readonly studentService: StudentService,
  ) // private readonly teacherService: TeacherService,
  {}

  async create(
    createUserInput: CreateUserInput,
  ): Promise<UserModel | undefined> {
    const createdUser = await this.userModel.create(createUserInput);

    return createdUser;
  }

  async updateUser(
    _id: string,
    email: string,
    phone: number,
    role: AllowedRole,
  ): Promise<UserModel | null> {
    const user = await this.userModel.findByIdAndUpdate(
      _id,
      {
        email,
        phone,
        role,
      },
      { new: true },
    );
    if (user) return user;
    else return null;
  }

  async updatePassword(
    password: string,
    salt: string,
    phone: number,
  ): Promise<UserModel | undefined> {
    const user = await this.userModel.findOneAndUpdate(
      { phone: phone },
      {
        password,
        salt,
      },
      { new: true },
    );

    return user;
  }

  // get my department and semester
  //   async getMyDepartmentAndSemester(): Promise<MyDeptSemResponse> {
  //     const user = await this.findOneById(this.requestService.getUserId());
  //     if (user && user.role === AllowedRole.st) {
  //       const student = await this.studentService.getStudentByUserId(user._id);
  //       const result = new MyDeptSemResponse();
  //       result.success = true;
  //       result.message = 'Student found';
  //       result.deptId = student.student.department.toString();
  //       result.semester = student.student.semester;
  //       return result;
  //     } else if (user && user.role === AllowedRole.fa) {
  //       const teacher = await this.teacherService.getTeacherByUserId(user._id);
  //       const result = new MyDeptSemResponse();
  //       result.success = true;
  //       result.message = 'Teacher found';
  //       result.deptId = teacher.teacher.department;
  //       result.semester = null;
  //       return result;
  //     } else {
  //       const result = new MyDeptSemResponse();
  //       result.success = false;
  //       result.message = 'User not found';
  //       return result;
  //     }
  //   }

  async me(): Promise<UserResponse> {
    const result = new UserResponse();
    const user = await this.findOneById(this.requestService.getUserId());
    if (user) {
      user.accessToken = this.getToken(user);
      user.password = '';
      user.salt = '';
      result.success = true;
      result.message = 'User logged in';
      result.user = user;
    } else {
      result.success = false;
      result.message = 'User not found';
    }
    return result;
  }

  //   async findUserById(id: string): Promise<StudentResponse | TeacherResponse> {
  //     const user = await this.userModel.findById(id).exec();
  //     if (user.role === AllowedRole.st) {
  //       const student = await this.studentService.getStudentByUserId(id);
  //       const result = new StudentResponse();
  //       result.success = true;
  //       result.message = 'Student found';
  //       result.student = student;
  //       return result;
  //     } else if (
  //       user.role === AllowedRole.fa ||
  //       user.role === AllowedRole.hod ||
  //       user.role === AllowedRole.pr ||
  //       user.role === AllowedRole.ad
  //     ) {
  //       const result = new TeacherResponse();
  //       const teacher = await this.teacherService.getTeacherByUserId(id);
  //       result.success = true;
  //       result.message = 'Teacher found';
  //       result.teacher = teacher;
  //       return result;
  //     }
  //   }

  async findOneById(id: string): Promise<UserModel | undefined> {
    return this.userModel.findById(id).exec();
  }

  async findByIdAndDelete(id: string): Promise<UserModel | undefined> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findOneByUsername(username: string): Promise<UserModel | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }
  async findOneByEmail(phone: number): Promise<UserModel | undefined> {
    return this.userModel.findOne({ phone }).exec();
  }
  async findOneByPhoneWithPassword(
    phone: number,
  ): Promise<UserModel | undefined> {
    return this.userModel
      .findOne({ phone })
      .select([
        'name',
        'firstName',
        'lastName',
        'role',
        'gender',
        'email',
        'username',
        'accessToken',
        'password',
        'salt',
        'phone',
        'verifiedPhone',
      ]);
  }

  async findOneByEmailWithPassword(
    email: string,
  ): Promise<UserModel | undefined> {
    return this.userModel
      .findOne({ email })
      .select([
        'name',
        'firstName',
        'lastName',
        'role',
        'gender',
        'email',
        'username',
        'accessToken',
        'password',
        'salt',
        'createdAt',
        'updatedAt',
        'phone',
        'verifiedPhone',
      ]);
  }

  //get users by role

  public async verifyPhone(phone: number): Promise<UserModel> {
    const user = await this.userModel.findOneAndUpdate(
      { phone },
      { verifiedPhone: true },
      { new: true },
    );

    return user;
  }

  public getToken(user: UserModel): string {
    const expiresIn = process.env.JWT_EXPIRES_IN;
    const secret = process.env.JWT_SECRET;
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secret,
      { expiresIn },
    );
    return accessToken;
  }

  async findOneByPhone(phone: number): Promise<UserModel | undefined> {
    return this.userModel.findOne({ phone }).exec();
  }
}
