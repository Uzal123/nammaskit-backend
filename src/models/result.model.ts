import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from './student.model';
import { Subject } from './department.model';
import { ResultType } from 'src/common/dto/result.type.enum';

@ObjectType()
@Schema({ timestamps: true })
export class Result {
  @Field(() => String, { description: 'The result id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Student)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Student.name })
  student: Student;

  @Field(() => Subject)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: Subject;

  @Field(() => ResultType)
  @Prop({ required: true })
  resultType: ResultType;

  @Field(() => Number)
  @Prop({ required: false })
  obtainedMark: number;
}

export type ResultModel = Document & Result;

export const ResultSchema = SchemaFactory.createForClass(Result);
