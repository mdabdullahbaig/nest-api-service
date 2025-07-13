import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
/**
 * Service for managing products.
 * Provides methods to add, retrieve, and store products in memory.
 */
export class ProductService {
  /**
   * In-memory array to store products.
   * This property is private and only accessible within ProductService.
   */
  private products: Product[] = [];

  private getProductIndex(id: number): number {
    return this.products.findIndex((product) => product.id == id);
  }

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

  /**
   * Retrieves a product by its ID.
   * @param id - Unique identifier of the product
   * @returns The product with the specified ID
   * @throws Error if the product is not found
   */
  getProduct(id: number): Product {
    const pInd = this.getProductIndex(id);

    if (pInd === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.products[pInd];
  }

  /**
   * Updates an existing product by its ID.
   * Updates only the fields provided in the body object.
   * @param id - Unique identifier of the product to update
   * @param body - Object containing updated fields: title, description, or price
   * @returns The updated product
   * @throws NotFoundException if the product is not found
   */
  updateProduct(
    id: number,
    body: {
      title?: string;
      description?: string;
      price?: number;
    },
  ) {
    const pInd = this.getProductIndex(id);

    if (pInd === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (body.title) this.products[pInd].title = body.title;
    if (body.description) this.products[pInd].description = body.description;
    if (body.price) this.products[pInd].price = body.price;

    return this.products[pInd];
  }

  /**
   * Deletes a product by its ID.
   * Removes the product from the products array if found.
   * @param id - Unique identifier of the product to delete
   * @throws NotFoundException if the product is not found
   */
  deleteProduct(id: number): void {
    const pInd = this.getProductIndex(id);

    if (pInd === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    this.products.splice(pInd, 1);
  }
}
