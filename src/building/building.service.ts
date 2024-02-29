import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'src/@entities/building.entity';
import { Repository } from 'typeorm';
import { CreateBuildingParams } from '../utils/types';
import { Apartment } from 'src/@entities/apartment.entity';
import { AssignApartmentDto } from './dtos/AssignApartment.dto';
import { Facilities } from 'src/@entities/facilities.entity';
import { BuildingFacilities } from 'src/@entities/building_facilities.entity';
import { AssignFacilitiesDto } from './dtos/AssignFacilities.dto';

@Injectable()
export class BuildingService {

  constructor(
    @InjectRepository(Building) private buildingRepository: Repository<Building>,
    @InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>,
    @InjectRepository(Facilities) private facilitiesRepository: Repository<Facilities>,
    @InjectRepository(BuildingFacilities) private buildingFacilitiesRepository: Repository<BuildingFacilities>
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

  async assignFacilities(buildingId: number, assignFacilitiesDto: AssignFacilitiesDto) {
    const { facilitiesId } = assignFacilitiesDto;

    const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
    if (!building) {
      throw new NotFoundException('Building not found');
    }

    const facilities = await this.facilitiesRepository.findOne({ where: { id: facilitiesId } });
    if (!facilities) {
      throw new NotFoundException('Facilities not found');
    }

    const buildingFacilities = new BuildingFacilities();
    buildingFacilities.building = building;
    buildingFacilities.facilities = facilities;

    if (facilities.isSecure) {
      buildingFacilities.lastInspection = new Date();
    } else if (buildingFacilities.lastInspection === null) {
      buildingFacilities.lastInspection = building.construction_date;
    } else {
      buildingFacilities.lastInspection = null;
    }

    await this.buildingFacilitiesRepository.save(buildingFacilities);

    return buildingFacilities;
  }

  async getBuildingStats(buildingId: number): Promise<any> {
    const building = await this.buildingRepository.findOne({ 
      where: { id: buildingId },
      relations: ['apartments', 'apartments.tenant']
    });

    if (!building) {
      throw new NotFoundException('Building not found');
    }

    const totalApartments = building.apartments.length;
    const occupiedApartments = building.apartments.filter(apartment => apartment.tenant.length > 0).length;
    const totalTenants = building.apartments.reduce((acc, apartment) => acc + apartment.tenant.length, 0);
    const singleOccupancyApartments = building.apartments.filter(apartment => apartment.tenant.length === 1).length;
    const overOccupancyApartments = building.apartments.filter(apartment => apartment.tenant.length > 1).length;

    const occupancyRate = totalApartments === 0 ? 0 : (occupiedApartments / totalApartments) * 100;

    return {
      building,
      stats: {
        totalApartments,
        occupancyRate,
        totalTenants,
        singleOccupancyApartments,
        overOccupancyApartments
      }
    };
  }

  async updateBuilding(id: number, updateBuildingDetails: CreateBuildingParams) {
    const update = await this.buildingRepository.update(
        { id }, 
        { ...updateBuildingDetails
    });
    
    return update
  }

  async deleteBuilding(buildingId: number): Promise<void> {
    const building = await this.buildingRepository.findOne({ 
      where: { id: buildingId },
      relations: ['apartments']
    });
  
    if (!building) {
      throw new NotFoundException('Building not found');
    }
  
    await this.buildingRepository.remove(building);
  }
}
