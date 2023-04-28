import { ObjectType, Field } from '@nestjs/graphql';
import { Subject } from 'src/models/department.model';

@ObjectType()
export class SubjectsResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [Subject], { nullable: true })
  result: Subject[];
}
