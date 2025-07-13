import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
   * Handles GET requests to retrieve all products.
   * @returns An object containing an array of all products
   */
  @Get()
  getAllProducts(): { products: Product[] } {
    return {
      products: this.productService.getAllProducts(),
    };
  }

  /**
   * Handles GET requests to retrieve a product by its ID.
   * @param id - The ID of the product to retrieve
   * @returns The product with the specified ID
   */
  @Get(':id')
  getProduct(@Param('id') id: number): Product {
    return this.productService.getProduct(id);
  }

  /**
   * Handles POST requests to add a new product.
   * @param productData - Object containing title, description, and price of the product
   * @returns Object with the new product's id and a success message
   */
  @Post()
  addProduct(
    @Body() body: { title: string; description: string; price: number },
  ): { id: number; message: string } {
    const id = this.productService.addProduct(
      body.title,
      body.description,
      body.price,
    );
    return { id, message: 'Product added successfully!' };
  }

  /**
   * Handles PATCH requests to update a product by its ID.
   * @param id - The ID of the product to update
   * @param body - Object containing updated fields: title, description, or price
   * @returns Object with the updated product's id and a success message
   */
  @Patch(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string; price?: number },
  ): { id: number; message: string } {
    const updatedProduct = this.productService.updateProduct(id, body);
    return {
      id: updatedProduct.id,
      message: 'Product updated successfully!',
    };
  }

  /**
   * Handles DELETE requests to remove a product by its ID.
   * Calls the service to delete the product and returns a success message.
   * @param id - The ID of the product to delete
   * @returns Object with a success message
   * @throws NotFoundException if the product is not found
   */
  @Delete(':id')
  deleteProduct(@Param('id') id: number): { message: string } {
    this.productService.deleteProduct(id);
    return { message: 'Product deleted successfully!' };
  }
}
