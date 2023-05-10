import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MyDeptSemResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => String, { nullable: true })
  deptId: string;
  @Field(() => Number, { nullable: true })
  semester: number;
}
