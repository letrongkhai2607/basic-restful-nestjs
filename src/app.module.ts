import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    // CacheModule.register({
    //   store: redisStore as any,
    //   host: 'localhost', //default host
    //   port: 6379, //default port
    // }),
    PrismaModule,
    ArticlesModule,
    UsersModule,
    AuthModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
