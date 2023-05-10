import { Field, InputType } from '@nestjs/graphql';
import { ResultType } from 'src/common/dto/result.type.enum';

@InputType()
export class UpdateAttendanceInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  subject: string | null;

  @Field(() => ResultType, { nullable: true })
  attendanceFor: ResultType | null;

  @Field(() => Number, { nullable: true })
  workingDay: number | null;

  @Field(() => Number, { nullable: true })
  presentDay: number | null;
}
