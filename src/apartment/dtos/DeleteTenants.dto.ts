import { ApiProperty } from '@nestjs/swagger';

export class DeleteTenantDto {
  @ApiProperty()
  tenantIds: number[];
}
