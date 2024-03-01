import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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

  @Get(':typeId/getTypeById')
  @ApiOkResponse({ description: 'Display type by id' })
  @ApiBadRequestResponse({ description: 'Type not found' })
  async getTypeById(@Param('typeId') typeId: number): Promise<any> {
    try {
      const res = await this.typeService.findTypeById(typeId);
      return res
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error fetching type data' });
    }
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

  //For updating type profile (replace with patch if yu want to update partially type, put update all the repository)
  @Put(':id/updateType')
  @ApiBadRequestResponse({ description: 'Error updating type' })
  async updateTypeById(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTypeDto: CreateTypeDto
      ){
      try {
        await this.typeService.updateType(id, updateTypeDto)
        return{ message: 'Type successfully updated' };
      } catch (error) {
          throw new BadRequestException({ message: 'Error updating type' });
      }
  }

  @Delete(':id/deleteType')
  @ApiOkResponse({ description: 'Type successfully deleted' })
  @ApiBadRequestResponse({ description: 'Error deleting type' })
  async deleteTypeById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.typeService.deleteType(id);
      return { message: 'Type successfully deleted' };
    } catch (error) {
      console.log(error)
      throw new BadRequestException({ message: 'Error deleting type' });
    }
  }
}
