import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';

/**
 * Unit tests for ProductController
 */
describe('ProductController', () => {
  let productController: ProductController;

  /**
   * Set up a fresh ProductController instance before each test
   */
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    /**
     * Should return all products after adding one
     */
    it('should return all products', () => {
      // Add a product first
      productController.addProduct({
        title: 'Test Product',
        description: 'Test Description',
        price: 100,
      });

      expect(productController.getAllProducts()).toEqual({
        products: [
          {
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            price: expect.any(Number),
          },
        ],
      });
    });

    /**
     * Should retrieve a product by its ID
     */
    it('should retrieve a product by id', () => {
      // Add a product first
      const productData = {
        title: 'Test Product',
        description: 'Test Description',
        price: 100,
      };
      const { id } = productController.addProduct(productData);

      expect(productController.getProduct(id)).toEqual(
        expect.objectContaining({
          id,
          title: productData.title,
          description: productData.description,
          price: productData.price,
        }),
      );
    });

    /**
     * Should throw an error if product not found
     */
    it('should throw an error if product not found', () => {
      expect(() => productController.getProduct(999)).toThrow(
        'Product with id 999 not found',
      );
    });

    /**
     * Should add a product and return its id and success message
     */
    it('should add a product', () => {
      const productData = {
        title: 'Test Product',
        description: 'Test Description',
        price: 100,
      };
      expect(productController.addProduct(productData)).toEqual({
        id: expect.any(Number),
        message: 'Product added successfully!',
      });
    });

    /**
     * Should update a product and return its id and success message
     */
    it('should update a product', () => {
      // Add a product first
      const productData = {
        title: 'Test Product',
        description: 'Test Description',
        price: 100,
      };
      const { id } = productController.addProduct(productData);

      const updateData = {
        title: 'Updated Product',
        description: 'Updated Description',
        price: 150,
      };

      expect(productController.updateProduct(id, updateData)).toEqual({
        id,
        message: 'Product updated successfully!',
      });

      // Verify the product was updated
      expect(productController.getProduct(id)).toEqual(
        expect.objectContaining({
          id,
          title: updateData.title,
          description: updateData.description,
          price: updateData.price,
        }),
      );
    });

    /**
     * Should throw an error if trying to update a non-existent product
     * Expects updateProduct to throw an error with the correct message when the product ID does not exist.
     */
    it('should throw an error if product to update not found', () => {
      const updateData = {
        title: 'Updated Product',
        description: 'Updated Description',
        price: 150,
      };

      expect(() => productController.updateProduct(999, updateData)).toThrow(
        'Product with id 999 not found',
      );
    });

    /**
     * Should delete a product and return a success message
     */
    it('should delete a product', () => {
      // Add a product first
      const productData = {
        title: 'Test Product',
        description: 'Test Description',
        price: 100,
      };
      const { id } = productController.addProduct(productData);

      expect(productController.deleteProduct(id)).toEqual({
        message: 'Product deleted successfully!',
      });
      // Verify the product was deleted
      expect(() => productController.getProduct(id)).toThrow(
        `Product with id ${id} not found`,
      );
    });

    /**
     * Should throw an error if trying to delete a non-existent product
     */
    it('should throw an error if product to delete not found', () => {
      expect(() => productController.deleteProduct(999)).toThrow(
        'Product with id 999 not found',
      );
    });
  });
});
