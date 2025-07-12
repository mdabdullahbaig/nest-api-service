import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

/**
 * Controller for handling product-related HTTP requests.
 */
@Controller('products')
export class ProductController {
  /**
   * Injects ProductService for product operations.
   * @param productService - Service for managing products
   */
  constructor(private readonly productService: ProductService) {}

  /**
   * Handles POST requests to add a new product.
   * @param productData - Object containing title, description, and price of the product
   * @returns Object with the new product's id and a success message
   */
  @Post()
  addProduct(
    @Body() productData: { title: string; description: string; price: number },
  ): { id: number; message: string } {
    const id = this.productService.addProduct(
      productData.title,
      productData.description,
      productData.price,
    );
    return { id, message: 'Product added successfully!' };
  }

  /**
   * Handles GET requests to retrieve all products.
   * @returns An object containing an array of all products
   */
  @Get()
  getAllProducts(): { products: Product[] } {
    return {
      products: this.productService.getAllProducts(),
    };
  }
}
