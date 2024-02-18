import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FacilitiesService } from './facilities.service';
import { Facilities } from 'src/@entities/facilities.entity';
import { CreateFacilitiesDto } from './dtos/CreateFacilities.dto';

@ApiTags('Facilities')
@Controller('facilities')
export class FacilitiesController {

  constructor(private facilitiesService: FacilitiesService){}

    //For getting a list of all facilities
    @Get('getFacilities')
    @ApiOkResponse({description: 'Display all facilities of the app'})
    @ApiBadRequestResponse({ description: 'Facilities not found' })
    getFacilities(){
        return this.facilitiesService.findFacilities();
    }

    //For create facilities
    @Post('createFacilities')
    @ApiCreatedResponse({
        description: 'Facilities successfully created',
        type: Facilities
    })
    @ApiBadRequestResponse({ description: 'Error creating facilities' })
    async createFacilities(@Body() createFacilitiesDto: CreateFacilitiesDto){
        try {
          await this.facilitiesService.createFacilities(createFacilitiesDto);
          return { message: "Facilities successfully created" };
        } catch (error) {
            console.error(error);
            throw new BadRequestException({ message: 'Error creating Facilities' });
        }
    }

}
