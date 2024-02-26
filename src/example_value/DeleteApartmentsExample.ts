import { ApiProperty } from '@nestjs/swagger';

export class DeleteApartmentsExample {
  @ApiProperty({example: [1,4,7]})
  apartmentsIds: number[];
}
