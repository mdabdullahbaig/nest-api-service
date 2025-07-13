import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

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
  });
});
