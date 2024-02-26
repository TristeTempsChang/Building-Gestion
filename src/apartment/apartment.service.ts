import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from 'src/@entities/apartment.entity';
import { Apartment_type } from 'src/@entities/type_apartment.entity';
import { CreateApartmentParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AssignOptionDto } from './dtos/AssignOption.dto';
import { Option } from 'src/@entities/option.entity';
import { AssignTenantDto } from './dtos/AssignTenant.dto';
import { Tenant } from 'src/@entities/tenant.entity';

@Injectable()
export class ApartmentService {

  constructor(
    @InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>,
    @InjectRepository(Apartment_type) private typeRepository: Repository<Apartment_type>,
    @InjectRepository(Option) private optionRepository: Repository<Option>,
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>
  ) { }

  findApartment() {
    return this.apartmentRepository.find({ relations: ['owner', 'type', 'options', 'tenant'] });
  }

  // For @Post Create
  async createApartment(apartmentDetails: CreateApartmentParams) {
    if (!apartmentDetails.typeId) {
      throw new BadRequestException('Type ID is required');
    }

    const type = await this.typeRepository.findOne({ where: { id: apartmentDetails.typeId } });
    if (!type) {
      throw new NotFoundException('Type not found');
    }

    const newApartment = this.apartmentRepository.create({
      ...apartmentDetails,
      type: type
    });
    
    const apartment = await this.apartmentRepository.save(newApartment);

    return apartment;
  }

  async assignOption(assignOptionDto: AssignOptionDto) {
    const { apartmentId, optionIds } = assignOptionDto;

    // Vérifiez si l'appartement existe
    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId } });
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    // Vérifiez si les options existent
    const options = await this.optionRepository.findByIds(optionIds);
    if (options.length !== optionIds.length) {
      throw new NotFoundException('One or more options not found');
    }

    // Assurez-vous que l'appartement a des options existantes, sinon initialisez-le
    if (!apartment.options) {
      apartment.options = [];
    }

    // Associez les options à l'appartement
    apartment.options = [...apartment.options, ...options];

    // Enregistrez les modifications de l'appartement
    await this.apartmentRepository.save(apartment);

    return apartment;
  }

  async assignTenant(apartmentId: number, assignTenantDto: AssignTenantDto) {
    const { tenantId } = assignTenantDto;

    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId }, relations: ['type', 'tenant'] });
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    if (apartment.tenant.length >= apartment.type.maximum_capacity) {
      throw new BadRequestException('Apartment has reached maximum capacity');
    }

    const tenant = await this.tenantRepository.findOne({ where: { id: tenantId } });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    tenant.apartment = apartment;

    await this.tenantRepository.save(tenant);

    return tenant;
  }

  async removeTenantFromApartment(apartmentId: number, tenantIds: number[]) {
    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId }, relations: ['tenant'] });
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    // Filter the tenants to be removed from the apartment
    apartment.tenant = apartment.tenant.filter(tenant => !tenantIds.includes(tenant.id));

    // Save the updated apartment
    await this.apartmentRepository.save(apartment);

    return { message: "Tenants successfully removed from the apartment" };
  }

  async updateApartment(id: number, updateApartmentDetails: CreateApartmentParams) {
    const update = await this.apartmentRepository.update(
        { id }, 
        { ...updateApartmentDetails
    });
    
    return update
  }
}
