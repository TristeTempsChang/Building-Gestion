import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingController } from './building/building.controller';
import { BuildingModule } from './building/building.module';
import { ApartmentController } from './apartment/apartment.controller';
import { ApartmentModule } from './apartment/apartment.module';
import { OwnerController } from './owner/owner.controller';
import { OwnerModule } from './owner/owner.module';
import { TenantController } from './tenant/tenant.controller';
import { FacilitiesController } from './facilities/facilities.controller';
import { OptionController } from './option/option.controller';
import { TypeController } from './type/type.controller';
import { TenantModule } from './tenant/tenant.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { OptionModule } from './option/option.module';
import { TypeModule } from './type/type.module';
import { Building } from './@entities/building.entity';
import { Apartment } from './@entities/apartment.entity';
import { Apartment_type } from './@entities/type_apartment.entity';
import { Owner } from './@entities/owner.entity';
import { Tenant } from './@entities/tenant.entity';
import { Option } from './@entities/option.entity';
import { Facilities } from './@entities/facilities.entity';
import { BuildingFacilities } from './@entities/building_facilities.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Developpement2003!',
      database: 'buildingGestion',
      entities: [Building, Apartment, Apartment_type, Owner, Tenant, Option, Facilities, BuildingFacilities],
      synchronize: true,
    }),
    BuildingModule,
    ApartmentModule,
    OwnerModule,
    TenantModule,
    FacilitiesModule,
    OptionModule,
    TypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
