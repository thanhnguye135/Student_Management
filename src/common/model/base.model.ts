import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseModel {
  @ApiProperty({
    description: 'Date and time when the object was created',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the object was last updated',
  })
  updatedAt: Date;
}
