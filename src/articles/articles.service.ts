import { Injectable, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ImagesService } from 'src/images/images.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

const ARTICLE_INCLUDE = {
  author: true,
  images: true,
};
@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto) {
    return this.prisma.article.create({
      data: createArticleDto,
    });
  }

  findAll() {
    return this.prisma.article.findMany({
      where: { published: true },
      include: ARTICLE_INCLUDE,
      orderBy: {
        id: 'desc',
      },
    });
  }

  findDrafts() {
    return this.prisma.article.findMany({
      where: { published: false },
      include: ARTICLE_INCLUDE,
      orderBy: {
        id: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.article.findUniqueOrThrow({
      where: {
        id,
      },
      include: ARTICLE_INCLUDE,
    });
  }

  async update(id: number, updateArticleDto) {
    const { thumbnail, ...rest } = updateArticleDto;

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
