import { ApiProperty } from '@nestjs/swagger';

export class AssignOptionDto {

  @ApiProperty()
  apartmentId: number;

  @ApiProperty()
  optionIds: number[];
}
