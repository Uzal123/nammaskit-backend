import { Field, ObjectType } from '@nestjs/graphql';
import { FetchResponse } from 'src/common/dto/fetch.response.dto';
import { ProductItem } from './ProductItem.response';

@ObjectType()
export class FetchProductsResponse extends FetchResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [ProductItem], { nullable: false })
  products: ProductItem[];
}

