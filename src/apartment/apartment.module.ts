import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from 'src/@entities/apartment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartment])
  ],
  providers: [ApartmentService],
  controllers: [ApartmentController]
})
export class ApartmentModule {}
