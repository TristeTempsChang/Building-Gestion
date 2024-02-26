import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'src/@entities/building.entity';
import { Apartment } from 'src/@entities/apartment.entity';
import { BuildingFacilities } from 'src/@entities/building_facilities.entity';
import { Facilities } from 'src/@entities/facilities.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building, Apartment, Facilities, BuildingFacilities])
  ],
  providers: [BuildingService],
  controllers: [BuildingController]
})
export class BuildingModule {}
