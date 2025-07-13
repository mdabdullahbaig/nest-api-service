# NestJS API Service

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A progressive Node.js framework for building efficient and scalable server-side applications.

## Description

This project is a simple NestJS API service for managing products. It demonstrates basic CRUD operations using controllers, services, and models. The project uses TypeScript and follows NestJS best practices.

## Features

- Product management (add, update, delete, retrieve products)
- RESTful API endpoints
- In-memory storage for products

## Product Model

The `Product` model is defined in `src/product/product.model.ts`:

```typescript
export class Product {
  id: number;
  title: string;
  description: string;
  price: number;

  constructor(id: number, title: string, description: string, price: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
```

## Product Service

The `ProductService` in `src/product/product.service.ts` provides methods to add, update, delete, and retrieve products, storing them in memory.

## Product Controller

The `ProductController` in `src/product/product.controller.ts` exposes endpoints to manage products:

- `POST /products` - Add a new product
- `GET /products` - Retrieve all products
- `GET /products/:id` - Retrieve a product by ID
- `PATCH /products/:id` - Update a product by ID
- `DELETE /products/:id` - Delete a product by ID

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Run tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Project Structure

```
src/
  app.controller.ts
  app.module.ts
  app.service.ts
  main.ts
  product/
    product.controller.ts
    product.model.ts
    product.module.ts
    product.service.ts
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Discord Channel](https://discord.gg/G7Qnnhy)
- [Official Courses](https://courses.nestjs.com/)
- [NestJS Mau Deployment](https://mau.nestjs.com)
- [NestJS Devtools](https://devtools.nestjs.com)
- [Enterprise Support](https://enterprise.nestjs.com)
- [Jobs Board](https://jobs.nestjs.com)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
