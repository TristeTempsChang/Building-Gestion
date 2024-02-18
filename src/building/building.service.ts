import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'src/@entities/building.entity';
import { Repository } from 'typeorm';
import { CreateBuildingParams } from '../utils/types';
import { Apartment } from 'src/@entities/apartment.entity';
import { AssignApartmentDto } from './dtos/AssignApartment.dto';

@Injectable()
export class BuildingService {

  constructor(
    @InjectRepository(Building) private buildingRepository: Repository<Building>,
    @InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>
  ) {}

  findBuildings() {
    return this.buildingRepository.find({relations: ['apartments', "buildingFacilities.facilities"]});
  }

  // For @Post Create method
  async createBuilding(buildingDetails: CreateBuildingParams) {

    const newBuilding = this.buildingRepository.create({
        ...buildingDetails,
        construction_date: new Date(),
    });
    const buidling = await this.buildingRepository.save(newBuilding);

    return buidling;
  }

  async assignApartment(buildingId: number, assignApartmentDto: AssignApartmentDto) {
    const { apartmentId } = assignApartmentDto;

    const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
    if (!building) {
      throw new NotFoundException('Building not found');
    }

    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId } });
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    apartment.building = building;

    await this.apartmentRepository.save(apartment);

    return apartment;
  }
}
