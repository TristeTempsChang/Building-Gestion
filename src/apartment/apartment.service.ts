import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from 'src/@entities/apartment.entity';
import { CreateApartmentParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ApartmentService {

  constructor(@InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>) {}

  findApartment() {
    return this.apartmentRepository.find({relations: ['owner', 'type', 'options', 'tenant']});
  }

  // For @Post Create
  async createApartment(apartmentDetails: CreateApartmentParams) {

    const newApartment = this.apartmentRepository.create({
        ...apartmentDetails
    });
    const apartment = await this.apartmentRepository.save(newApartment);

    return apartment;
  }
}
