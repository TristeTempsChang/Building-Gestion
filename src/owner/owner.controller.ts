import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dtos/CreateOwner.dto';
import { Owner } from 'src/@entities/owner.entity';
import { AssignApartmentDto } from 'src/building/dtos/AssignApartment.dto';
import { DeleteApartmentDto } from './dtos/DeleteApartment.dto';
import { DeleteApartmentsExample } from 'src/example_value/DeleteApartmentsExample';

@ApiTags('Owner')
@Controller('Owner')
export class OwnerController {

  constructor(private ownerService: OwnerService){}

  //For getting a list of all owners
  @Get('getOwner')
  @ApiOkResponse({description: 'Display all owners of the app'})
  @ApiBadRequestResponse({ description: 'Owners not found' })
  getOwners(){
      return this.ownerService.findOwners();
  }

  //For create options
  @Post('createOwner')
  @ApiCreatedResponse({
      description: 'Owner successfully created',
      type: Owner
  })
  @ApiBadRequestResponse({ description: 'Error creating owner' })
  async createOwner(@Body() createOwnerDto: CreateOwnerDto){
      try {
        await this.ownerService.createOwner(createOwnerDto);
        return { message: "Owner successfully created" };
      } catch (error) {
          console.error(error);
          throw new BadRequestException({ message: 'Error creating owner...' });
      }
  }

  @ApiBadRequestResponse({ description: 'Error associating apartment' })
    @Post(':ownerId/assignApartment')
    async assignApartment(@Body() assignApartmentDto: AssignApartmentDto, @Param('ownerId') ownerId: number) {
        try {
            await this.ownerService.assignApartment(ownerId, assignApartmentDto);
            return { message: "Apartment successfully add to owner apartment list" };
        } catch (error) {
            console.error(error);
            throw new BadRequestException({ message: 'Error associating apartment' });
        }
    }

  @Delete(':ownerId/removeApartment')
  @ApiOkResponse({ 
    description: 'Apartments successfully removed from the owner',
    type: DeleteApartmentsExample 
  })
  @ApiBadRequestResponse({ description: 'Error removing apartment' })
  async removeTenantFromApartment(@Body() deleteApartmentDto: DeleteApartmentDto, @Param('ownerId') ownerId: number) {
      try {
          const { apartmentsIds } = deleteApartmentDto;
          await this.ownerService.removeApartmentFromOwner(ownerId, apartmentsIds);
          return { message: "Apartments successfully removed from the owner" };
      } catch (error) {
          console.error(error);
          throw new BadRequestException({ message: 'Error removing Apartment' });
      }
  }

  @Put(':id/updateOwner')
  @ApiBadRequestResponse({ description: 'Error updating owner' })
  async updateTenantById(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateOwnerDto: CreateOwnerDto
      ){
      try {
        await this.ownerService.updateOwner(id, updateOwnerDto)
        return{ message: 'Owner successfully updated' };
      } catch (error) {
          throw new BadRequestException({ message: 'Error updating Owner' });
      }
  }

  @Delete(':id/deleteOwner')
  @ApiOkResponse({ description: 'Owner successfully deleted' })
  @ApiBadRequestResponse({ description: 'Error deleting owner' })
  async deleteOwnerById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.ownerService.deleteOwner(id);
      return { message: 'Owner successfully deleted' };
    } catch (error) {
      console.log(error)
      throw new BadRequestException({ message: 'Error deleting owner' });
    }
  }
}
