import { ApiProperty } from '@nestjs/swagger';

export class AssignApartmentDto {
  @ApiProperty()
  apartmentId: number;
}
