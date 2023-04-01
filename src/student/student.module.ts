import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student,StudentSchema } from "src/models/student.model";
import { User,UserSchema } from "src/models/user.model";
import { RequestService } from "src/request.service";
import { StudentResolver } from "./student.resolver";
import { StudentService } from "./student.service";
import { UsersModule } from "src/user/users.module";

//student module class
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
    UsersModule,
  ],
  providers: [RequestService, StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {} 