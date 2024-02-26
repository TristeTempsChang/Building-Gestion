import { ApiProperty } from '@nestjs/swagger';

export class AssignTenantDto {
  @ApiProperty()
  tenantId: number;
}
