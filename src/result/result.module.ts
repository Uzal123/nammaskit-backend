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

//student module class
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
    StudentModule,
  ],
  providers: [RequestService, ResultResolver, ResultService],
  exports: [ResultService],
})
export class ResultModule {}
