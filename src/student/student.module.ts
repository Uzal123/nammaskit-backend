import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/models/student.model';
import { User, UserSchema } from 'src/models/user.model';
import { RequestService } from 'src/request.service';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import { UsersModule } from 'src/user/users.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { Otp, OtpSchema } from 'src/models/otp.model';
import { SmsService } from 'src/sms/sms.service';
import { HttpService } from '@nestjs/axios';

//student module class
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Otp.name, schema: OtpSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
    UsersModule,
    AuthModule,
  ],
  providers: [RequestService, StudentResolver, AuthService, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
