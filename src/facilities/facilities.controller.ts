import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FacilitiesService } from './facilities.service';
import { Facilities } from 'src/@entities/facilities.entity';
import { CreateFacilitiesDto } from './dtos/CreateFacilities.dto';

@ApiTags('Facilities')
@Controller('facilities')
export class FacilitiesController {

  constructor(private facilitiesService: FacilitiesService){}

    //For getting a list of all facilities
    @Get('getFacilities')
    @ApiOperation({summary: "Get all facilities"})
    @ApiOkResponse({description: 'Display all facilities of the app'})
    @ApiBadRequestResponse({ description: 'Facilities not found' })
    getFacilities(){
        return this.facilitiesService.findFacilities();
    }

    @Get(':facilitiesId/getFacilitiesById')
    @ApiOperation({summary: "Get one facility"})
    @ApiOkResponse({ description: 'Display facilities by id' })
    @ApiBadRequestResponse({ description: 'Facilities not found' })
    async getFacilitiesById(@Param('facilitiesId') facilitiesId: number): Promise<any> {
        try {
            const res = await this.facilitiesService.findFacilitiesById(facilitiesId);
            return res
        } catch (error) {
            console.error(error);
            throw new BadRequestException({ message: 'Error fetching facilities data' });
        }
    }

    //For create facilities
    @Post('createFacilities')
    @ApiOperation({summary: "Create a facility"})
    @ApiCreatedResponse({
        description: 'Facilities successfully created',
        type: Facilities
    })
    @ApiBadRequestResponse({ 
        description: 'Error creating Facilities',
        schema: {
          example: {
            message: 'Error creating Facilities'
          }
        }
      })
    async createFacilities(@Body() createFacilitiesDto: CreateFacilitiesDto){
        try {
          await this.facilitiesService.createFacilities(createFacilitiesDto);
          return { message: "Facilities successfully created" };
        } catch (error) {
            console.error(error);
            throw new BadRequestException({ message: 'Error creating Facilities' });
        }
    }

    @Put(':id/updateFacilities')
    @ApiOperation({summary: "update a facility"})
    @ApiCreatedResponse({
        description: 'Facilities successfully updated',
        schema: {
          example: {
            message: 'Facilities successfully updated'
          }
        }
      })
      @ApiBadRequestResponse({ 
        description: 'Error updating Facilities',
        schema: {
          example: {
            message: 'Error updating Facilities'
          }
        }
      })
    async updateTenantById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFacilitiesDto: CreateFacilitiesDto
        ){
        try {
            await this.facilitiesService.updateFacilities(id, updateFacilitiesDto)
            return{ message: 'Facilities successfully updated' };
        } catch (error) {
            throw new BadRequestException({ message: 'Error updating Facilities' });
        }
    }

    @Delete(':id/deleteFacilities')
    @ApiOperation({summary: "Delete a facility"})
    @ApiCreatedResponse({
        description: 'Facilities successfully deleted',
        schema: {
          example: {
            message: 'Facilities successfully deleted'
          }
        }
      })
      @ApiBadRequestResponse({ 
        description: 'Error deleting Facilities',
        schema: {
          example: {
            message: 'Error deleting Facilities'
          }
        }
      })
    async deleteTenantById(@Param('id', ParseIntPipe) id: number) {
        try {
        await this.facilitiesService.deleteFacilities(id);
        return { message: 'Facilities successfully deleted' };
        } catch (error) {
        console.log(error)
        throw new BadRequestException({ message: 'Error deleting facilities' });
        }
    }

}
