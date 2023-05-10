import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from './student.model';
import { Result } from './result.model';
import { ResultType } from 'src/common/dto/result.type.enum';
import { Subject } from './department.model';

@ObjectType()
@Schema({ timestamps: true })
export class Attendance {
  @Field(() => String, { description: 'The DeptId id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Subject)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: Subject;

  @Field(() => ResultType)
  @Prop({ required: true })
  attendanceFor: ResultType;

  @Field(() => String)
  @Prop({ required: true })
  workingDay: string;

  @Field(() => Number)
  @Prop({ required: true })
  presentDay: number;

  @Field(() => Student)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Student.name })
  student: Student;
}

export type AttendanceModel = Document & Attendance;

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
