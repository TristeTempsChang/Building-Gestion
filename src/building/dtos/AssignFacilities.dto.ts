import { ApiProperty } from '@nestjs/swagger';

export class AssignFacilitiesDto {
  @ApiProperty()
  facilitiesId: number;

  @ApiProperty({ example: "Put the date or put null"})
  lastInspection: Date;
}
