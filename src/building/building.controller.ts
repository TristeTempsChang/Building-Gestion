import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({summary: "Get all building"})
  @ApiOkResponse({ description: 'Display all buildings of the app' })
  @ApiBadRequestResponse({ description: 'Buildings not found' })
  getBuildings() {
    return this.buildingService.findBuildings();
  }

  //For create building
  @Post('createBuilding')
  @ApiOperation({summary: "Create a building"})
  @ApiCreatedResponse({
    description: 'Building successfully created',
    type: Building
  })
  @ApiBadRequestResponse({ 
    description: 'Error creating building',
    schema: {
      example: {
        message: 'Error creating building'
      }
    }
  })
  async createBuilding(@Body() createBuildingDto: CreateBuildingDto) {
    try {
      await this.buildingService.createBuilding(createBuildingDto);
      return { message: "Building successfully created" };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error creating building' });
    }
  }

  @Post(':buildingId/assignApartment')
  @ApiOperation({summary: "Assign an apartment to a building"})
  @ApiCreatedResponse({
    description: 'Apartment successfully associated with building',
    type: AssignApartmentDto
  })
  @ApiBadRequestResponse({ 
    description: 'Error associating apartment',
    schema: {
      example: {
        message: 'Error associating apartment'
      }
    }
  })
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
  @ApiOperation({summary: "Assign facilities to a building"})
  @ApiCreatedResponse({
    description: 'Facilities successfully associated with building',
    type: AssignFacilitiesDto
  })
  @ApiBadRequestResponse({ 
    description: 'Error associating facilities',
    schema: {
      example: {
        message: 'Error associating facilities'
      }
    }
  })
  async assignFacilities(@Param('buildingId') buildingId: number, @Body() assignFacilitiesDto: AssignFacilitiesDto) {
    try {
      await this.buildingService.assignFacilities(buildingId, assignFacilitiesDto);
      return { message: "facility successfully associated with building" };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error associating facilities' });
    }
  }

  @Get(':buildingId/getBuildingById')
  @ApiOperation({summary: "Get one building with all associate statistics"})
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
  @ApiOperation({summary: "update a building"})
    @ApiCreatedResponse({
        description: 'Building successfully updated',
        schema: {
          example: {
            message: 'Building successfully updated'
          }
        }
      })
      @ApiBadRequestResponse({ 
        description: 'Error updating building',
        schema: {
          example: {
            message: 'Error updating building'
          }
        }
      })
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
  @ApiOperation({summary: "Delete a building"})
    @ApiCreatedResponse({
        description: 'Building successfully deleted',
        schema: {
          example: {
            message: 'Building successfully deleted'
          }
        }
      })
      @ApiBadRequestResponse({ 
        description: 'Error deleting building',
        schema: {
          example: {
            message: 'Error deleting building'
          }
        }
      })
  async deleteBuilding(@Param('buildingId') buildingId: number) {
    try {
      await this.buildingService.deleteBuilding(buildingId)
      return { message: 'Building successfully deleted' }
    } catch (error) {
      throw new BadRequestException({ message: 'Error deleting building' });
    }
  }

}
