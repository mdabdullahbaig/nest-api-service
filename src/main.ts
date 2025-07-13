/**
 * Entry point for the NestJS application.
 * Sets up global API prefix, enables CORS, and starts the server.
 * Listens on the port specified in the environment variable PORT, or defaults to 3000.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstraps the NestJS application.
 * Configures global settings and starts the HTTP server.
 */
async function bootstrap() {
  // Create the NestJS application using the root AppModule
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for all API routes
  app.setGlobalPrefix('api/v1');

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors();

  // Start listening on the specified port or default to 3000
  await app.listen(process.env.PORT ?? 3000);
}

// Initialize the application
bootstrap();
