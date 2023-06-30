import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}
  create(createImageDto) {
    return this.prisma.image.create({
      data: createImageDto,
    });
  }

  findAll() {
    return this.prisma.image.findMany();
  }

  findOne(id: number) {
    return this.prisma.image.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return this.prisma.image.delete({
      where: {
        id,
      },
    });
  }
}
