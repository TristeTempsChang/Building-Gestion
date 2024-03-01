import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findTenantById(id: number){
    return this.tenantRepository.findOne({ 
      where: { id: id },
      relations: ['apartment']
    });
  }

  // For @Post Create
  async createTenant(tenantDetails: CreateOptionParams) {

    const newTenant = this.tenantRepository.create({
        ...tenantDetails
    });
    const tenant = await this.tenantRepository.save(newTenant);

    return tenant;
  }

  async updateTenant(id: number, tenantDetails: CreateOptionParams) {

    const update = await this.tenantRepository.update(
      { id }, 
      { ...tenantDetails
    });

    return update
  }

  async deleteTenant(id: number) {
    const result = await this.tenantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    return { message: 'Tenant successfully deleted' };
  }

}
