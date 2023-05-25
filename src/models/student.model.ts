import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Teacher } from './teacher.model';
import { Department } from './department.model';

@ObjectType()
@Schema({ timestamps: true })
export class Student {
  @Field(() => String, { description: 'The profileId id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  user: User;

  @Field(() => String)
  @Prop({ required: false })
  usn: String;

  @Field(() => String)
  @Prop({ required: true })
  currentAddress: String;

  @Field(() => Date)
  @Prop({ required: true })
  dob: Date;

  @Field(() => String)
  @Prop({ required: false })
  category: String;

  @Field(() => Department)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Department.name })
  department: Department | string;

  @Field(() => String)
  @Prop({ required: true })
  admissionYear: String;

  @Field(() => String)
  @Prop({ required: true })
  fatherName: String;

  @Field(() => String)
  @Prop({ required: true })
  motherName: String;

  @Field(() => String)
  @Prop({ required: true })
  parentPhone: String;

  @Field(() => String)
  @Prop({ required: true })
  parentOccupation: String;

  @Field(() => String)
  @Prop({ required: true })
  anualIncome: String;

  @Field(() => String)
  @Prop({ required: true })
  entranceExamMarks: String;

  @Field(() => Boolean, { nullable: true })
  @Prop({ required: false })
  isEligible: Boolean;

  @Field(() => String, { nullable: true })
  @Prop({ nullable: true, default: '' })
  section: String;

  @Field(() => String)
  @Prop({ required: true })
  parmanentAddress: String;

  @Field(() => String)
  @Prop({ required: true })
  course: String;

  @Field(() => Number)
  @Prop({ required: true })
  semester: number;

  @Field(() => Teacher, { nullable: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Teacher.name,
    nullable: true,
  })
  proctor: Teacher | null | undefined;
}

@ObjectType()
export class SemesterResult {
  @Field(() => String)
  semester: string;

  @Field(() => [SubjectResult])
  subjects: SubjectResult[];
}

@ObjectType()
export class SubjectResult {
  @Field(() => String)
  subject: string;

  @Field(() => Number)
  marks: number;
}

export type StudentModel = Document & Student;

export const StudentSchema = SchemaFactory.createForClass(Student);
