import { ObjectType, Field } from '@nestjs/graphql';
import { Teacher } from 'src/models/teacher.model';

@ObjectType()
export class TeacherResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [Teacher], { nullable: true })
  teacher: Teacher[];
}
