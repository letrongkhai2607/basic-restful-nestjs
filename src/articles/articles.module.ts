import { AuthModule } from './../auth/auth.module';
import { ImagesModule } from './../images/images.module';
import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [PrismaModule, ImagesModule, AuthModule],
})
export class ArticlesModule {}
