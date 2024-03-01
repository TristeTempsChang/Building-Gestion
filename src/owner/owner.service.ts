import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from 'src/@entities/apartment.entity';
import { Owner } from 'src/@entities/owner.entity';
import { AssignApartmentDto } from 'src/building/dtos/AssignApartment.dto';
import { CreateOwnerParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {

  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>
  ) {}

  findOwners() {
    return this.ownerRepository.find({relations: ['apartments']});
  }

  async findOwnerById(id: number){
    return this.ownerRepository.findOne({ 
      where: { id: id },
      relations: ['apartments']
    });
  }

  async createOwner(ownerDetails: CreateOwnerParams) {

    const newOwner = this.ownerRepository.create({
        ...ownerDetails
    });
    const owner = await this.ownerRepository.save(newOwner);

    return owner;
  }

  async assignApartment(ownerId: number, assignApartmentDto: AssignApartmentDto) {
    const { apartmentId } = assignApartmentDto;

    const owner = await this.ownerRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId } });
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    apartment.owner = owner;

    await this.apartmentRepository.save(apartment);

    return apartment;
  }

  async removeApartmentFromOwner(ownerId: number, ApartmentIds: number[]) {
    const owner = await this.ownerRepository.findOne({ where: { id: ownerId }, relations: ['apartments'] });
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    // Filter the tenants to be removed from the apartment
    owner.apartments = owner.apartments.filter(apartment => !ApartmentIds.includes(apartment.id));

    // Save the updated apartment
    await this.ownerRepository.save(owner);

    return { message: "Apartment successfully removed from the owner" };
  }

  async updateOwner(id: number, ownerDetails: CreateOwnerParams) {

    const update = await this.ownerRepository.update(
      { id }, 
      { ...ownerDetails
    });

    return update
  }

  async deleteOwner(id: number) {
    const result = await this.ownerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return { message: 'Owner successfully deleted' };
  }

}
