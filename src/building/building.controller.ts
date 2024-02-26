import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { Building } from 'src/@entities/building.entity';
import { CreateBuildingDto } from './dtos/CreateBuilding.dto';
import { AssignApartmentDto } from './dtos/AssignApartment.dto';
import { AssignFacilitiesDto } from './dtos/AssignFacilities.dto';

@ApiTags('Building')
@Controller('building')
export class BuildingController {

  constructor(private buildingService: BuildingService) { }

  //For getting a list of all buildings
  @Get('getBuilding')
  @ApiOkResponse({ description: 'Display all buildings of the app' })
  @ApiBadRequestResponse({ description: 'Buildings not found' })
  getBuildings() {
    return this.buildingService.findBuildings();
  }

  //For create building
  @Post('createBuilding')
  @ApiCreatedResponse({
    description: 'Building successfully created',
    type: Building
  })
  @ApiBadRequestResponse({ description: 'Error creating user' })
  async createBuilding(@Body() createBuildingDto: CreateBuildingDto) {
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

  @Post(':buildingId/assign-facilities')
  async assignFacilities(@Param('buildingId') buildingId: number, @Body() assignFacilitiesDto: AssignFacilitiesDto) {
    try {
      await this.buildingService.assignFacilities(buildingId, assignFacilitiesDto);
      return { message: "facility successfully associated with building" };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error associating apartment' });
    }
  }

  @Get(':buildingId/getBuildingById')
  @ApiOkResponse({ description: 'Display building statistics' })
  @ApiBadRequestResponse({ description: 'Building not found' })
  async getBuildingById(@Param('buildingId') buildingId: number): Promise<any> {
    try {
      const res = await this.buildingService.getBuildingStats(buildingId);
      return res
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error fetching building data' });
    }
  }

  @Put(':id/updateBuilding')
  @ApiBadRequestResponse({ description: 'Error updating building' })
  async updateBuilding(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBuildingrDto: CreateBuildingDto
  ) {
    try {
      await this.buildingService.updateBuilding(id, updateBuildingrDto)
      return { message: 'Building successfully updated' }
    } catch (error) {
      throw new BadRequestException({ message: 'Error updating building' });
    }
  }

  @Delete(':buildingId/deleteBuilding')
  @ApiOkResponse({ description: 'Building successfully deleted' })
  @ApiBadRequestResponse({ description: 'Building not found' })
  async deleteBuilding(@Param('buildingId') buildingId: number) {
    try {
      await this.buildingService.deleteBuilding(buildingId)
      return { message: 'Building successfully deleted' }
    } catch (error) {
      throw new BadRequestException({ message: 'Error deleting building' });
    }
  }

}
