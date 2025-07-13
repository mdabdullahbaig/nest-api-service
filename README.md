# NestJS API Service

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A progressive Node.js framework for building efficient and scalable server-side applications.

## Description

This project is a simple NestJS API service for managing products and users. It demonstrates basic CRUD operations using controllers, services, and models. The project uses TypeScript and follows NestJS best practices. Authentication is enforced for all product modification endpoints using a custom AuthMiddleware that checks for a Bearer token in the Authorization header.

## Features

- Product management (add, update, delete, retrieve products)
- User management (create, retrieve single user, list all users)
- RESTful API endpoints
- In-memory storage for products
- MongoDB integration for users
- Authentication middleware for protected product routes

## Authentication

All product modification endpoints (POST, PATCH, DELETE) require a valid Bearer token in the Authorization header. GET requests to product endpoints are public. The AuthMiddleware checks for the presence and format of the token. Example:

```http
Authorization: Bearer <your-token>
```

## Product Controller

The `ProductController` in `src/product/product.controller.ts` exposes endpoints to manage products:

- `GET /products` - Retrieve all products (public)
- `GET /products/:id` - Retrieve a product by ID (public)
- `POST /products` - Add a new product (protected)
- `PATCH /products/:id` - Update a product by ID (protected)
- `DELETE /products/:id` - Delete a product by ID (protected)

## Users Controller

The `UsersController` in `src/users/users.controller.ts` exposes endpoints to manage users:

- `POST /users` - Create a new user
- `GET /users` - Retrieve all users
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
    product.controller.spec.ts
    product.service.ts
    product.module.ts
    product.model.ts
  users/
    users.controller.ts
    users.controller.spec.ts
    users.service.ts
    users.module.ts
    entities/
      user.schema.ts
    dto/
      create-user.dto.ts
  middleware/
    auth.middleware.ts
```

## API Documentation

See `swagger.yaml` for full OpenAPI documentation of all endpoints, request/response schemas, and authentication requirements.

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
