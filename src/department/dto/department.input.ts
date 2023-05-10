import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@InputType()
export class CreateDepartmentInput {
  @Field(() => String)
  @Prop({ required: true })
  deptName: string;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  deptCode: string;


  @Field(() => Number)
  @Prop({ required: true })
  numberOfSemesters: number;
}
