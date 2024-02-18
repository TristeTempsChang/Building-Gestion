import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from 'src/@entities/facilities.entity';
import { CreateFacilitiesParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class FacilitiesService {

  constructor(@InjectRepository(Facilities) private facilitiesRepository: Repository<Facilities>) {}

  findFacilities() {
    return this.facilitiesRepository.find();
  }

  // For @Post create
  async createFacilities(facilitiesDetails: CreateFacilitiesParams) {

    const newFacilities = this.facilitiesRepository.create({
        ...facilitiesDetails
    });
    const facilities = await this.facilitiesRepository.save(newFacilities);

    return facilities;
  }
}
