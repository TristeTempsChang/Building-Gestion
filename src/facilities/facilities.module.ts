import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from 'src/@entities/facilities.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facilities])
  ],
  providers: [FacilitiesService],
  controllers: [FacilitiesController]
})
export class FacilitiesModule {}
