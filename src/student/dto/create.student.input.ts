import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { AllowedDepartment } from 'src/common/dto/allowed.departments.enum';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';

//inputs for the createStudent mutation with user input and student model form
@InputType()
export class CreateStudentInput {
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => AllowedRole)
  role: AllowedRole;

  @Field(() => Number)
  phone: number;
  
  @Field(() => String)
  semester: string;

  @Field(() => String, { description: 'The user full Name' })
  @Prop({ required: true })
  gender: string;

  @Field(() => String)
  @Prop({ required: false })
  usn: String;

  @Field(() => String)
  @Prop({ required: true })
  currentAddress: String;

  @Field(() => String)
  @Prop({ required: true })
  dob: String;

  @Field(() => String)
  @Prop({ required: false })
  category: String;

  @Field(() => AllowedDepartment)
  @Prop({ required: true })
  department: AllowedDepartment;

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

  @Field(() => String)
  @Prop({ required: true })
  parmanentAddress: String;

  @Field(() => String)
  @Prop({ required: true })
  course: String;
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
