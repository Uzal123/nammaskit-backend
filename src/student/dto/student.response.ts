import { ObjectType, Field } from '@nestjs/graphql';
import { Student } from 'src/models/student.model';

@ObjectType()
export class StudentResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => Student, { nullable: true })
  student: Student | null;
}

@ObjectType()
export class StudentsResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [Student], { nullable: true })
  students: Student[] | null;
}
