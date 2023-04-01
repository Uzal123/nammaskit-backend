import { FetchProductsResponse } from './dto/fetch.product.response';
import { FetchProductInput } from './dto/fetch.product.input';
import { ProductService } from './product.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductResponse } from './dto/product.response';
import { Product } from 'src/models/product.model';
import {
  CreateRentProductInput,
  CreateSellProductInput,
} from './dto/create.product.input';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => ProductResponse, {
    name: 'sellProduct',
  })
  @UseGuards(AuthGuard)
  async sellProduct(
    @Args('sellProductInput', { type: () => CreateSellProductInput })
    sellProductInput: CreateSellProductInput,
  ) {
    return this.productService.createSell(sellProductInput);
  }

  @Mutation(() => ProductResponse, {
    name: 'rentProduct',
  })
  @UseGuards(AuthGuard)
  async rentProduct(
    @Args('rentProductInput', { type: () => CreateRentProductInput })
    data: CreateRentProductInput,
  ) {
    return this.productService.createRent(data);
  }

  @Mutation(() => ProductResponse, {
    name: 'deleteProductById',
  })
  @UseGuards(AuthGuard)
  async deleteProductById(
    @Args('productId', { type: () => String })
    productId: string,
  ) {
    return this.productService.deletProductById(productId);
  }

  @Query(() => FetchProductsResponse, {
    name: 'getUserProducts',
    description: 'Get my Products',
  })
  @UseGuards(AuthGuard)
  async myProducts(
    @Args('fetchInput', { type: () => FetchProductInput })
    input: FetchProductInput,
    @Args('userId', { type: () => String })
    userId: string,
  ) {
    return this.productService.fetchUserProducts(input, userId);
  }

  @Query(() => FetchProductsResponse, {
    name: 'fetchProducts',
    description: 'get all the rented product',
  })
  async allProduct(
    @Args('fetchInput', { type: () => FetchProductInput })
    input: FetchProductInput,
  ) {
    return this.productService.fetchProducts(input);
  }

  @Query(() => ProductResponse, {
    name: 'getProductDetails',
    description: 'get the details selling product',
  })
  async getProductDetails(
    @Args('productId', { type: () => String })
    id: string,
  ) {
    console.log(id);
    return this.productService.getProductById(id);
  }
}
