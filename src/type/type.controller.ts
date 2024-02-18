import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TypeService } from './type.service';
import { Apartment_type } from 'src/@entities/type_apartment.entity';
import { CreateTypeDto } from './dtos/CreateTypeDto';

@ApiTags('Apartment type')
@Controller('type')
export class TypeController {

  constructor(private typeService: TypeService){}

  //For getting a list of all types
  @Get('getTypes')
  @ApiOkResponse({description: 'Display all types of the app'})
  @ApiBadRequestResponse({ description: 'Types not found' })
  getTypes(){
      return this.typeService.findType();
  }

  //For create type
  @Post('createTypes')
  @ApiCreatedResponse({
      description: 'Apartment type successfully created',
      type: Apartment_type
  })
  @ApiBadRequestResponse({ description: 'Error creating type' })
  async createApartmentType(@Body() createTypeDto: CreateTypeDto){
      try {
        await this.typeService.createType(createTypeDto);
        return { message: "Apartment type successfully created" };
      } catch (error) {
          console.error(error);
          throw new BadRequestException({ message: 'Error creating apartment type' });
      }
  }
}
