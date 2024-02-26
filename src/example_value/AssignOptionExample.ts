import { ApiProperty } from '@nestjs/swagger';

export class AssignOptionExample {

  @ApiProperty({example: 1})
  apartmentId: number;

  @ApiProperty({example: [1,4,7]})
  optionIds: number[];
}
