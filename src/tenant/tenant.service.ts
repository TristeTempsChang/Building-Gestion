import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from 'src/@entities/tenant.entity';
import { CreateOptionParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {

  constructor(@InjectRepository(Tenant) private tenantRepository: Repository<Tenant>) {}

  findTenant() {
    return this.tenantRepository.find({relations: ['apartment']});
  }

  // For @Post Create
  async createTenant(tenantDetails: CreateOptionParams) {

    const newTenant = this.tenantRepository.create({
        ...tenantDetails
    });
    const tenant = await this.tenantRepository.save(newTenant);

    return tenant;
  }

}
