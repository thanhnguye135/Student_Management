import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClassOnStudentDto {
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
  readonly email: string;

  @ApiProperty({
    description: 'Phone number of the student',
  })
  @IsString()
  @IsNotEmpty()
  readonly phone_number: string;
}
