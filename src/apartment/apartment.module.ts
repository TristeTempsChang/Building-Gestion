import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from 'src/@entities/apartment.entity';
import { Apartment_type } from 'src/@entities/type_apartment.entity';
import { Option } from 'src/@entities/option.entity';
import { Tenant } from 'src/@entities/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartment, Apartment_type, Option, Tenant])
  ],
  providers: [ApartmentService],
  controllers: [ApartmentController]
})
export class ApartmentModule {}
