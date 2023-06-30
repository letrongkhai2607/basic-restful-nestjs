import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateImageDto {
  @ApiPropertyOptional({
    description: 'Image',
    type: 'string',
    format: 'binary',
  })
  file: string;

  @ApiProperty()
  articleId?: number;
}
