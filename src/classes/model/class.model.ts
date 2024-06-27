import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { BaseModel } from 'src/common/model/base.model';
import { Student } from 'src/students/model/student.model';
import { Subject } from 'src/subjects/model/subject.model';

export class Class extends BaseModel {
  @ApiProperty()
  class_id: number;

  @ApiProperty({
    description: 'Name of the class',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Room where the class is held',
  })
  @IsString()
  @IsNotEmpty()
  room: string;

  @ApiProperty({
    description: 'Group of the class',
  })
  @IsNotEmpty()
  @IsInt()
  group: number;

  @ApiProperty({
    type: () => [Subject],
    description: 'List of subjects associated with the class',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Subject)
  subjects: Subject[];

  @ApiProperty({
    type: () => [Student],
    description: 'List of students associated with the class',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Student)
  students: Student[];
}
