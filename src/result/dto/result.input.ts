import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateResultInput {
  @Field(() => String)
  studentId: string;

  @Field(() => [Semester])
  results: [Semester];
}

@InputType()
export class Semester {
  @Field(() => String)
  semester: string;

  @Field(() => [Subject])
  subjects: Subject[];
}

@InputType()
export class Subject {
  @Field(() => String)
  subject: string;

  @Field(() => Number)
  marks: number;
}


