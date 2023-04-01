import { FetchProductsResponse } from './dto/fetch.product.response';
import { FetchProductInput } from './dto/fetch.product.input';
import { Product, ProductModel } from '../models/product.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aggregate, AggregateOptions, Model, Types } from 'mongoose';
import { AllowedOfferType } from 'src/common/dto/offerTypes.enum';
import { RequestService } from 'src/request.service';
import { UploadService } from 'src/upload/upload.service';
import {
  CreateRentProductInput,
  CreateSellProductInput,
} from './dto/create.product.input';
import { ProductResponse } from './dto/product.response';
import { User } from 'src/models/user.model';
import { Profile, ProfileModel } from 'src/models/profile.model';
import { ProductItem } from './dto/ProductItem.response';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductModel>,
    @InjectModel(Product.name)
    private readonly profileModel: Model<ProfileModel>,
    private readonly requestService: RequestService,
    private readonly uploadService: UploadService,
  ) {}

  async createRent(
    rentInput: CreateRentProductInput,
  ): Promise<ProductResponse> {
    const response = new ProductResponse();
    const createdRentProduct = new this.productModel({
      ...rentInput,
      createdBy: this.requestService.getUserId(),
      offerType: AllowedOfferType.re,
    });
    await (await createdRentProduct.save()).populate('createdBy');
    let createdProudct = createdRentProduct as unknown as ProductItem;
    createdProudct.profile = null;
    response.message = 'Ad regsitered';
    response.success = true;
    response.product = createdProudct;

    return response;
  }

  async createSell(
    sellInput: CreateSellProductInput,
  ): Promise<ProductResponse> {
    const response = new ProductResponse();

    const createdSellProduct = new this.productModel({
      ...sellInput,
      createdBy: this.requestService.getUserId(),
      offerType: AllowedOfferType.se,
    });

    await (await createdSellProduct.save()).populate('createdBy');

    let createdProudct = createdSellProduct as unknown as ProductItem;
    createdProudct.profile = null;
    response.message = 'Ad regsitered';
    response.success = true;
    response.product = createdProudct;
    return response;
  }

  public async fetchUserProducts(
    input: FetchProductInput,
    userId: String,
  ): Promise<FetchProductsResponse> {
    const { count, offerType, pageNo } = input;
    const response = new FetchProductsResponse();
    response.message = 'success';
    response.success = true;
    response.products = (await this.productModel
      .find({
        offerType: { $in: offerType },
        createdBy: userId,
      })
      .populate('createdBy')
      .skip((pageNo - 1) * count)

      .limit(count)) as unknown as ProductItem[];

    return response;
  }

  public async fetchProducts(
    input: FetchProductInput,
  ): Promise<FetchProductsResponse> {
    const { count, offerType, pageNo, search, vehicleType } = input;
    const response = new FetchProductsResponse();
    response.message = 'success';
    response.success = true;

    const searchString = search
      ? search.split(' ').join('|') + '|' + search
      : null;

    const match: any = searchString
      ? [
          {
            $match: {
              offerType: { $in: offerType },
              vehicleType: { $in: vehicleType },
              $or: [
                { title: { $regex: new RegExp(searchString, 'i') } },
                { discription: { $regex: new RegExp(searchString, 'i') } },
              ],
            },
          },
          { $sample: { size: count } },
          { $skip: (pageNo - 1) * count },
        ]
      : [
          {
            $match: {
              offerType: { $in: offerType },
              vehicleType: { $in: vehicleType },
            },
          },
          { $skip: (pageNo - 1) * count },
          { $limit: count },
        ];

    const products = await this.productModel.aggregate([
      ...match,

      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: 'createdBy',
      //     foreignField: '_id',
      //     as: 'createdBy',
      //   },
      // },
      // {
      //   $unwind: '$createdBy',
      // },
      // {
      //   $lookup: {
      //     from: 'profiles',
      //     localField: 'createdBy._id',
      //     foreignField: 'user',
      //     as: 'profile',
      //   },
      // },
      // {
      //   $unwind: '$profile',
      // },
    ]);
    response.products = products;
    response.currentPage = pageNo;
    response.hasNextPage = products.length === count;

    return response;
  }

  public async deletProductById(productId: string): Promise<ProductResponse> {
    const response = new ProductResponse();
    const product = await this.productModel.findOneAndDelete(
      {
        _id: productId,
        createdBy: this.requestService.getUserId(),
      },
      {
        new: true,
      },
    );

    if (product) {
      response.message = 'Product Deleted';
      response.success = true;
    } else {
      response.message = "Product doesn't exist";
      response.success = false;
    }

    return response;
  }

  //todo
  public async getProductById(id: string): Promise<ProductResponse> {
    const response = new ProductResponse();

    const products = await this.productModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      {
        $unwind: '$createdBy',
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'createdBy._id',
          foreignField: 'user',
          as: 'profile',
        },
      },
      {
        $unwind: '$profile',
      },
      // {
      //   $group: {
      //     _id: '$createdBy',
      //     productCount: { $sum: 1 },
      //   },
      // },
    ]);

    // console.log({ products : products[0].productCount});


    if (products.length === 0) {
      response.message = 'product not found';
      response.success = false;
    } else {
      response.message = 'product found';
      response.success = true;
      response.product = products[0];
    }
    return response;
  }
}
