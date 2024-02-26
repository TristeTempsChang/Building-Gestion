import { ApiProperty } from '@nestjs/swagger';

export class DeleteTenantExample {
  @ApiProperty({example: [1,4,7]})
  tenantIds: number[];
}
