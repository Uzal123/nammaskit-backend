import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { AllowedDepartment } from 'src/common/dto/allowed.departments.enum';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';


@InputType()
export class CreateTeacherInput {
  @Field(() => String, { description: 'The user full Name' })
  @Prop({ required: true })
  firstName: string;

  @Field(() => String, { description: 'The user full Name' })
  @Prop({ required: true })
  lastName: string;

  @Field(() => String, { description: 'The user full Name' })
  @Prop({ required: true })
  gender: string;

  @Field(() => AllowedRole, {
    description: 'The user full Name',
    defaultValue: AllowedRole.fa,
  })
  @Prop({ default: AllowedRole.st, required: false })
  role: AllowedRole;

  @Field(() => String, { description: 'Email is required', nullable: true })
  @Prop({ required: false })
  email: string;

  @Field(() => String, { description: 'Password is required', nullable: false })
  @Prop({ required: true, select: false, defaultValue: '' })
  password: string;

  @Field(() => Number, { description: 'Phone is required', nullable: true })
  @Prop({ required: false })
  phone: number;


  @Field(() => AllowedDepartment)
  @Prop({ required: true })
  department: AllowedDepartment;

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

// Path: src\student\dto\update.student.input.ts
//inputs for the updateStudent mutation
@InputType()
export class UpdateStudentInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  role: string;
  @Field()
  _id: string;
}

// Path: src\student\dto\student.input.ts
//inputs for the student query
@InputType()
export class StudentInput {
  @Field()
  _id: string;
}
