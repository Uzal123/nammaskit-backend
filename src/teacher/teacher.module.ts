import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from 'src/models/teacher.model';
import { User, UserSchema } from 'src/models/user.model';
import { RequestService } from 'src/request.service';
import { UsersModule } from 'src/user/users.module';
import { TeacherResolver } from './teacher.resolver';
import { TeacherService } from './teacher.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { OtpSchema, Otp } from 'src/models/otp.model';

//teacher module class
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Otp.name, schema: OtpSchema },
      { name: Teacher.name, schema: TeacherSchema },
    ]),
    UsersModule,
    AuthModule,
  ],
  providers: [RequestService, TeacherResolver, AuthService, TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
