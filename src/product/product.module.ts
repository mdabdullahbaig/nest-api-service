import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

/**
 * ProductModule is responsible for managing product-related components,
 * including controllers and providers for product operations.
 */
@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
