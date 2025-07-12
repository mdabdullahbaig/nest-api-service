// Application configuration loaded from environment variables
export default () => ({
  // Application port
  port: parseInt(process.env.PORT ?? '3000', 10),

  // MongoDB configuration
  mongoUrl: process.env.MONGO_URL || '', // MongoDB connection URL

  // PostgreSQL configuration
  pgDialect: process.env.PG_DIALECT ?? 'postgres', // Database dialect
  pgHost: process.env.PG_HOST, // Database host
  pgPort: parseInt(process.env.PG_PORT ?? '5432', 10), // Database port
  pgUser: process.env.PG_USER, // Database username
  pgPassword: process.env.PG_PASSWORD, // Database password
  pgDatabase: process.env.PG_DATABASE, // Database name

  // Optionally, you can add a combined URL if needed
  // pgUrl: process.env.PG_URL,
});
