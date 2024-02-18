import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { ApartmentController } from 'src/apartment/apartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment_type } from 'src/@entities/type_apartment.entity';
import { TypeController } from './type.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartment_type])
  ],
  providers: [TypeService],
  controllers: [TypeController]
})
export class TypeModule {}
