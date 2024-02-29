import { ApiProperty } from '@nestjs/swagger';

export class AssignFacilitiesDto {
  @ApiProperty()
  facilitiesId: number;
}
