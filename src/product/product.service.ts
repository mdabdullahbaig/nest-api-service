import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
/**
 * Service for managing products.
 * Provides methods to add, retrieve, and store products in memory.
 */
export class ProductService {
  /**
   * In-memory array to store products.
   */
  products: Product[] = [];

  /**
   * Adds a new product to the products array.
   * @param title - Name of the product
   * @param description - Description of the product
   * @param price - Price of the product
   * @returns The ID of the newly added product
   */
  addProduct(title: string, description: string, price: number): number {
    const id = this.products.length + 1; // Simple ID generation
    const newProduct = new Product(id, title, description, price);

    this.products.push(newProduct);
    return id;
  }

  /**
   * Retrieves all products from the products array.
   * @returns An array of all products
   */
  getAllProducts(): Product[] {
    return this.products;
  }
}
