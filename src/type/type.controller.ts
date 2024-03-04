import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TypeService } from './type.service';
import { Apartment_type } from 'src/@entities/type_apartment.entity';
import { CreateTypeDto } from './dtos/CreateTypeDto';

@ApiTags('Apartment type')
@Controller('type')
export class TypeController {

  constructor(private typeService: TypeService){}

  //For getting a list of all types
  @Get('getTypes')
  @ApiOperation({summary: "Get all types"})
  @ApiOkResponse({description: 'Display all types of the app'})
  @ApiBadRequestResponse({ description: 'Types not found' })
  getTypes(){
      return this.typeService.findType();
  }

  @Get(':typeId/getTypeById')
  @ApiOperation({summary: "Get one type"})
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
  @ApiOperation({summary: "Create a type"})
  @ApiCreatedResponse({
      description: 'Apartment type successfully created',
      type: Apartment_type
  })
  @ApiBadRequestResponse({ 
    description: 'Error creating apartment type',
    schema: {
      example: {
        message: 'Error creating apartment type'
      }
    }
  })
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
  @ApiOperation({summary: "Update one type"})
  @ApiCreatedResponse({
    description: 'Type successfully updated',
    schema: {
      example: {
        message: 'Type successfully updated'
      }
    }
  })
  @ApiBadRequestResponse({ 
    description: 'Error updating type',
    schema: {
      example: {
        message: 'Error updating type'
      }
    }
  })
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
  @ApiOperation({summary: "Delete one type"})
  @ApiCreatedResponse({
    description: 'Type successfully deleted',
    schema: {
      example: {
        message: 'Type successfully deleted'
      }
    }
  })
  @ApiBadRequestResponse({ 
    description: 'Error deleting type',
    schema: {
      example: {
        message: 'Error deleting type'
      }
    }
  })
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
