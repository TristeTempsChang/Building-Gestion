import { ApiProperty } from '@nestjs/swagger';

export class DeleteApartmentDto {
  @ApiProperty()
  apartmentsIds: number[];
}
