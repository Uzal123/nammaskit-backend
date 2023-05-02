import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from './student.model';

@ObjectType()
@Schema({ timestamps: true })
export class SubjectMarks {
  @Field(() => String)
  @Prop({ required: false })
  subcode: string;

  @Field(() => Number)
  @Prop({ required: false })
  ObtainedMark: number;

  @Field(() => Number)
  @Prop({ required: false, default: 100 })
  fullMark: number;
}

@ObjectType()
@Schema({ timestamps: true })
export class IAMarks {
  @Field(() => String)
  @Prop({ required: false })
  IA1: string;

  @Field(() => String)
  @Prop({ required: false })
  IA2: string;

  @Field(() => String)
  @Prop({ required: false })
  IA3: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Result {
  @Field(() => String, { description: 'The result id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Student.name })
  @Field(() => Student)
  student: Student | string;

  @Field(() => Number)
  @Prop({ required: true, unique: true })
  semester: number;

  

  @Field(() => [SubjectMarks], { defaultValue: [] })
  @Prop({ required: false, default: [] })
  subjects: SubjectMarks[];
}

export type ResultModel = Document & Result;

export const ResultSchema = SchemaFactory.createForClass(Result);
