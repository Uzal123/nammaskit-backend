import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/models/product.model";
import { Profile } from "src/models/profile.model";

@ObjectType()
export class ProductItem extends Product {
  @Field(() => Profile, { nullable: true })
  profile: Profile;
}
