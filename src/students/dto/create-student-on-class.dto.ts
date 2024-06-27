import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSubjectDto } from 'src/subjects/dto/create-subject.dto';

export class CreateStudentOnClassDto {
  @ApiProperty({
    description: 'Name of the class',
  })
  // @IsString()
  // @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Room of the class',
  })
  // @IsString()
  // @IsNotEmpty()
  readonly room: string;

  @ApiProperty({
    description: 'Group of the class',
  })
  // @IsInt()
  // @IsNotEmpty()
  readonly group: number;

  @ApiProperty({
    type: () => [CreateSubjectDto],
    description: 'List of subjects associated with the class',
  })
  // @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubjectDto)
  readonly subjects: CreateSubjectDto[];
}
