import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClassDto } from 'src/classes/dto/create-class.dto';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Name of the subject',
  })
  // @IsString()
  // @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Credit of the subject',
  })
  // @IsInt()
  // @IsNotEmpty()
  readonly credit: number;

  @ApiPropertyOptional({
    description: 'ID of the class',
  })
  // @IsInt()
  // @IsNotEmpty()
  readonly class_id?: number;

  @ApiPropertyOptional({
    type: () => [CreateClassDto],
    description: 'Class associated with the subject',
  })
  @Type(() => CreateClassDto)
  readonly class?: CreateClassDto[];
}
