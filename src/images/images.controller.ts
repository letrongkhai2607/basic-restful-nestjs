import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { extname } from 'path';
import { Request } from 'express';

import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('articles/upload/images')
@ApiTags('Article uploads images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @Post()
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile() file,
    @Req() request: Request,
  ) {
    const HOST = request.get('Host');
    const url = `${HOST}/${file.filename}`;

    return this.imagesService.create({
      url,
      articleId: +createImageDto.articleId,
    });
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.remove(+id);
  }
}
