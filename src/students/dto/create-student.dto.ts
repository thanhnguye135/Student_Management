import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { CreateStudentOnClassDto } from './create-student-on-class.dto';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Name of the student',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Address of the student',
  })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({
    description: 'Email of the student',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Phone number of the student',
  })
  @IsString()
  @IsNotEmpty()
  readonly phone_number: string;

  @ApiProperty({
    type: () => [CreateStudentOnClassDto],
    description: 'List of classes associated with the student',
  })
  // @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStudentOnClassDto)
  readonly classes: CreateStudentOnClassDto[];
}
