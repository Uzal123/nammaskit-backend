import { Product, ProductSchema } from './../models/product.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.model';
import { RequestService } from 'src/request.service';
import { UploadService } from 'src/upload/upload.service';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { Profile, ProfileSchema } from 'src/models/profile.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [ProductService, ProductResolver, RequestService, UploadService],
  exports: [],
})
export class ProductModule {}
