import { BadRequestException, Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { Building } from 'src/@entities/building.entity';
import { CreateBuildingDto } from './dtos/CreateBuilding.dto';
import { AssignApartmentDto } from './dtos/AssignApartment.dto';

@ApiTags('Building')
@Controller('building')
export class BuildingController {

  constructor(private buildingService: BuildingService){}

    //For getting a list of all buildings
    @Get('getBuilding')
    @ApiOkResponse({description: 'Display all buildings of the app'})
    @ApiBadRequestResponse({ description: 'Buildings not found' })
    getBuildings(){
        return this.buildingService.findBuildings();
    }

    //For create building
    @Post('createBuilding')
    @ApiCreatedResponse({
        description: 'Building successfully created',
        type: Building
    })
    @ApiBadRequestResponse({ description: 'Error creating user' })
    async createBuilding(@Body() createBuildingDto: CreateBuildingDto){
        try {
          await this.buildingService.createBuilding(createBuildingDto);
          return { message: "Building successfully created" };
        } catch (error) {
            console.error(error);
            throw new BadRequestException({ message: 'Error creating building' });
        }
    }

    @ApiBadRequestResponse({ description: 'Error associating apartment' })
    @Post(':buildingId/assignApartment')
    async assignApartment(@Body() assignApartmentDto: AssignApartmentDto, @Param('buildingId') buildingId: number) {
        try {
            await this.buildingService.assignApartment(buildingId, assignApartmentDto);
            return { message: "Apartment successfully associated with building" };
        } catch (error) {
            console.error(error);
            throw new BadRequestException({ message: 'Error associating apartment' });
        }
    }

}
