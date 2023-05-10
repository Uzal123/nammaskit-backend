import { Field, InputType } from '@nestjs/graphql';
import { ResultType } from 'src/common/dto/result.type.enum';

@InputType()
export class CreateAttendanceInput {
  @Field(() => String)
  subject: string;

  @Field(() => ResultType)
  attendanceFor: ResultType;

  @Field(() => Number)
  workingDay: number;

  @Field(() => Number)
  presentDay: number;

  @Field(() => String)
  student: string;
}
