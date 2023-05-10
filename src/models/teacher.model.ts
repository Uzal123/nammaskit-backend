// schema for teacher model
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Department } from './department.model';

@ObjectType()
@Schema({ timestamps: true })
export class Teacher {
  @Field(() => String, { description: 'The profileId id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  user: User ;

  @Field(() => Department)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Department.name })
  department: Department | string;

  @Field(() => String)
  @Prop({ required: true })
  designation: String;

  @Field(() => String)
  @Prop({ required: true })
  qualification: String;

  @Field(() => String)
  @Prop({ required: true })
  experience: String;

  @Field(() => String)
  @Prop({ required: true })
  address: String;
}

export type TeacherModel = Document & Teacher;

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
