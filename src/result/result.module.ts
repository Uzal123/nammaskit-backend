import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/models/student.model';
import { User, UserSchema } from 'src/models/user.model';
import { RequestService } from 'src/request.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { Otp, OtpSchema } from 'src/models/otp.model';
import { StudentService } from 'src/student/student.service';
import { StudentResolver } from 'src/student/student.resolver';
import { StudentModule } from 'src/student/student.module';
import { Result, ResultSchema } from 'src/models/result.model';
import { ResultResolver } from './result.resolver';
import { ResultService } from './result.service';
import { DepartmentService } from 'src/department/department.service';
import { DepartmentModule } from 'src/department/department.module';
import {
  Department,
  DepartmentSchema,
  Subject,
  SubjectSchema,
} from 'src/models/department.model';
import { Attendance, AttendanceSchema } from 'src/models/attendance.model';

//student module class
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
    MongooseModule.forFeature([
      { name: Attendance.name, schema: AttendanceSchema },
    ]),
    StudentModule,
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
    DepartmentModule,
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  providers: [RequestService, ResultResolver, ResultService, DepartmentService],
  exports: [ResultService],
})
export class ResultModule {}
