import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateSubjectDto } from 'src/subjects/dto/create-subject.dto';
import { CreateClassOnStudentDto } from './create-class-on-student.dto';

export class CreateClassDto {
  @ApiProperty({
    description: 'Name of the class',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Room of the class',
  })
  @IsString()
  @IsNotEmpty()
  readonly room: string;

  @ApiProperty({
    description: 'Group of the class',
  })
  @IsInt()
  @IsNotEmpty()
  readonly group: number;

  @ApiProperty({
    type: () => [CreateSubjectDto],
    description: 'List of subjects associated with the class',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubjectDto)
  readonly subjects: CreateSubjectDto[];

  @ApiProperty({
    type: () => [CreateClassOnStudentDto],
    description: 'List of students associated with the class',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClassOnStudentDto)
  readonly students: CreateClassOnStudentDto[];
}
