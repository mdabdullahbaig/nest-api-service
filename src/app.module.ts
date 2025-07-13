import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(configuration().mongoUrl),
    SequelizeModule.forRoot({
      dialect: configuration().pgDialect as 'postgres',
      host: configuration().pgHost,
      port: configuration().pgPort,
      username: configuration().pgUser,
      password: configuration().pgPassword,
      database: configuration().pgDatabase,
      models: [],
    }),
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
