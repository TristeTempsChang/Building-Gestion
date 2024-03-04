import { ApiProperty } from '@nestjs/swagger';

export class AssignApartmentDto {
  @ApiProperty({example: 3})
  apartmentId: number;
}
