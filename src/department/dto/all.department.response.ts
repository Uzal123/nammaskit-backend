import { ObjectType, Field } from '@nestjs/graphql';
import { Department } from 'src/models/department.model';

@ObjectType()
export class DepartmentsResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [Department], { nullable: true })
  results: Department[];
}
