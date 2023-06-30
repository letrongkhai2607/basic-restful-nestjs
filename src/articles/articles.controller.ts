import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Get,
  Inject,
  UseInterceptors,
  Req,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { cleanObject } from '../common/cleanObject';

import Cache from 'cache-manager';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ArticleEntity } from './entities/article.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthService } from 'src/auth/auth.service';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService, // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly authServices: AuthService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file,
    @Req() request,
  ) {
    const HOST = request.get('Host');
    const url = `${HOST}/${file.filename}`; // Image url

    const { title, description, body, published } = createArticleDto;
    const currentUser = await this.authServices.getCurrentUser(request);

    return new ArticleEntity(
      await this.articlesService.create({
        title,
        description,
        body,
        published,
        thumbnail: url,
        authorId: currentUser.id,
      }),
    );
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts() {
    const drafts = await this.articlesService.findDrafts();
    return drafts.map((draft) => new ArticleEntity(draft));
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiCreatedResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
    @Req() request,
    @UploadedFile() file,
  ) {
    const HOST = request.get('Host');
    const url = file && `${HOST}/${file?.filename}`; // Image url

    const { title, description, body, published } = updateArticleDto;
    const currentUser = await this.authServices.getCurrentUser(request);
    return new ArticleEntity(
      await this.articlesService.update(
        id,
        cleanObject({
          title,
          description,
          body,
          published,
          thumbnail: url,
          authorId: currentUser.id,
        }),
      ),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.remove(id));
  }
}
