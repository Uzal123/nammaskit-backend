import { ObjectType, Field } from '@nestjs/graphql';
import { Department } from 'src/models/department.model';

@ObjectType()
export class DepartmentResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => Department, { nullable: true })
  result: Department;
}
