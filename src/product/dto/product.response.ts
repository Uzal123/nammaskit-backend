import { ObjectType, Field } from '@nestjs/graphql';
import { ProductItem } from './ProductItem.response';

@ObjectType()
export class ProductResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => ProductItem, { nullable: true })
  product: ProductItem;
  
}

