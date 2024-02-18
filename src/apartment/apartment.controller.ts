import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { Apartment } from 'src/@entities/apartment.entity';
import { CreateApartmentDto } from './dtos/CreateApartment.dto';

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {

  constructor(private apartmentService: ApartmentService){}

  //For getting a list of all apartment
  @Get('getApartment')
  @ApiOkResponse({description: 'Display all apartments of the app'})
  @ApiBadRequestResponse({ description: 'Apartments not found' })
  getApartment(){
      return this.apartmentService.findApartment();
  }

  //For create apartment
  @Post('createApartment')
  @ApiCreatedResponse({
      description: 'Apartment successfully created',
      type: Apartment
  })
  @ApiBadRequestResponse({ description: 'Error creating apartment' })
  async createApartment(@Body() createApartmentDto: CreateApartmentDto){
      try {
        await this.apartmentService.createApartment(createApartmentDto);
        return { message: "Apartment successfully created" };
      } catch (error) {
          console.error(error);
          throw new BadRequestException({ message: 'Error creating apartment' });
      }
  }
}
