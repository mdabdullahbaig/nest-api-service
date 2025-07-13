# NestJS API Service

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A progressive Node.js framework for building efficient and scalable server-side applications.

## Description

This project is a simple NestJS API service for managing products and users. It demonstrates basic CRUD operations using controllers, services, and models. The project uses TypeScript and follows NestJS best practices.

## Features

- Product management (add, update, delete, retrieve products)
- User management (create, retrieve users)
- RESTful API endpoints
- In-memory storage for products
- MongoDB integration for users

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

## User Model

The `User` model is defined in `src/users/entities/user.schema.ts`:

```typescript
@Schema()
export class User {
  @Prop({ required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  phone?: string;
}
```

## Product Controller

The `ProductController` in `src/product/product.controller.ts` exposes endpoints to manage products:

- `GET /products` - Retrieve all products
- `GET /products/:id` - Retrieve a product by ID
- `POST /products` - Add a new product
- `PATCH /products/:id` - Update a product by ID
- `DELETE /products/:id` - Delete a product by ID

## Users Controller

The `UsersController` in `src/users/users.controller.ts` exposes endpoints to manage users:

- `POST /users` - Create a new user
- `GET /users/:id` - Retrieve a user by ID

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
  users/
    users.controller.ts
    users.controller.spec.ts
    users.service.ts
    users.module.ts
    entities/
      user.schema.ts
    dto/
      create-user.dto.ts
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
