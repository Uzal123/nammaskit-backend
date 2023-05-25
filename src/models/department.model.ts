import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Teacher } from './teacher.model';

@ObjectType()
@Schema({ timestamps: true })
export class Department {
  @Field(() => String, { description: 'The DeptId id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  deptName: string;

  @Field(() => Number)
  @Prop({ required: true, default: 8 })
  numberOfSemesters: number;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  deptCode: string;
}

export type DepartmentModel = Document & Department;

export const DepartmentSchema = SchemaFactory.createForClass(Department);

@ObjectType()
@Schema({ timestamps: true })
export class Subject {
  @Field(() => String, { description: 'The Subject id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  subjectName: string;

  @Field(() => Department)
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
  })
  department: Department | string;

  @Field(() => Number)
  @Prop({
    required: true,
  })
  semester: number;

  @Field(() => String)
  @Prop({ required: false })
  scheme: string;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  subjectCode: string;

  @Field(() => String)
  @Prop({ required: true })
  subjectType: string;

  @Field(() => Number)
  @Prop({ required: true })
  subjectCredits: number;

  @Field(() => String)
  @Prop({ required: false })
  subjectDescription: string;

  @Field(() => [Teacher], { nullable: true })
  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  })
  teachers: Teacher[] | string[];
}

export type SubjectModel = Document & Subject;

export const SubjectSchema = SchemaFactory.createForClass(Subject);
