import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

/**
 * ProductModule is responsible for managing product-related components,
 * including controllers and providers for product operations.
 */
@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
