import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RequestService } from 'src/request.service';

import { StudentModule } from 'src/student/student.module';
import {
  Department,
  DepartmentSchema,
  Subject,
  SubjectSchema,
} from 'src/models/department.model';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';

//student module class
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
    StudentModule,
  ],
  providers: [RequestService, DepartmentResolver, DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
