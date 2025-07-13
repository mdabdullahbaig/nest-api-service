import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

/**
 * ProductsModule configures product-related controllers and providers.
 * It applies AuthMiddleware to all product routes except GET requests,
 * allowing public access to product listing and details while protecting other operations.
 */
@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule implements NestModule {
  /**
   * Configures middleware for product routes.
   * AuthMiddleware is excluded from GET requests to allow public access.
   * @param consumer MiddlewareConsumer instance
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'products', method: RequestMethod.GET },
        { path: 'products/*', method: RequestMethod.GET },
      )
      .forRoutes(ProductController);
  }
}
