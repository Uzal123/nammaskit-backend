import { ObjectType, Field } from '@nestjs/graphql';
import { Attendance } from 'src/models/attendance.model';

@ObjectType()
export class AttendanceResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => Attendance, { nullable: true })
  attendance: Attendance;
}
