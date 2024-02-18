import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'src/@entities/building.entity';
import { Apartment } from 'src/@entities/apartment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building, Apartment])
  ],
  providers: [BuildingService],
  controllers: [BuildingController]
})
export class BuildingModule {}
