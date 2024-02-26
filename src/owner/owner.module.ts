import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from 'src/@entities/owner.entity';
import { OwnerController } from './owner.controller';
import { Apartment } from 'src/@entities/apartment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner, Apartment])
  ],
  providers: [OwnerService],
  controllers: [OwnerController]
})
export class OwnerModule {}
