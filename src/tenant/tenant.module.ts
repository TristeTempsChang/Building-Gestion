import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { Tenant } from 'src/@entities/tenant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant])
  ],
  providers: [TenantService],
  controllers: [TenantController]
})
export class TenantModule {}
