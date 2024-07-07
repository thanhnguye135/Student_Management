import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Class } from 'src/classes/model/class.model';
import { BaseModel } from 'src/common/model/base.model';

export class Subject extends BaseModel {
  @ApiProperty()
  subject_id: number;

  @ApiProperty({
    description: 'Name of the subject',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Credit value of the subject',
  })
  @IsInt()
  @IsNotEmpty()
  credit: number;

  @ApiProperty({
    description: 'Class ID associated with the subject',
  })
  @IsInt()
  @IsNotEmpty()
  class_id: number;

  @ApiProperty({
    type: () => [Class],
    description: 'A class associated with the class',
  })
  @Type(() => Class)
  class: Class;
}
