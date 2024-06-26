import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { BaseModel } from 'src/common/model/base.model';
import { StudentOnClass } from 'src/common/model/studentOnClass.model';

export class Student extends BaseModel {
  @ApiProperty()
  student_id: number;

  @ApiProperty({
    description: 'Name of the student',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Address of the student',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Email of the student',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the student',
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    type: () => [StudentOnClass],
    description: 'List of classes associated with the student',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentOnClass)
  classes: StudentOnClass[];
}
