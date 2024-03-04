import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';
import { Apartment } from 'src/@entities/apartment.entity';
import { CreateApartmentDto } from './dtos/CreateApartment.dto';
import { AssignOptionDto } from './dtos/AssignOption.dto';
import { AssignOptionExample } from 'src/example_value/AssignOptionExample';
import { AssignTenantDto } from './dtos/AssignTenant.dto';
import { DeleteTenantDto } from './dtos/DeleteTenants.dto';
import { DeleteTenantExample } from 'src/example_value/DeleteTenantExample';

@ApiTags('Apartment')
@Controller('apartment')
export class ApartmentController {

  constructor(private apartmentService: ApartmentService) { }

  //For getting a list of all apartment
  @Get('getApartment')
  @ApiOperation({ summary: "Get all apartment" })
  @ApiOkResponse({ description: 'Display all apartments of the app' })
  @ApiBadRequestResponse({ description: 'Apartments not found' })
  getApartment() {
    return this.apartmentService.findApartment();
  }

  @Get(':apartmentId/getApartmentById')
  @ApiOperation({ summary: "Get an apartment" })
  @ApiOkResponse({ description: 'Display apartment by id' })
  @ApiBadRequestResponse({ description: 'Apartment not found' })
  async getOwnerById(@Param('apartmentId') apartmentId: number): Promise<any> {
    try {
      const res = await this.apartmentService.findApartmentById(apartmentId);
      return res
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error fetching apartment data' });
    }
  }

  //For create apartment
  @Post('createApartment')
  @ApiOperation({ summary: "Create an apartment" })
  @ApiCreatedResponse({
    description: 'Apartment successfully created',
    type: Apartment
  })
  @ApiBadRequestResponse({
    description: 'Error creating apartment',
    schema: {
      example: {
        message: 'Error creating apartment'
      }
    }
  })
  async createApartment(@Body() createApartmentDto: CreateApartmentDto) {
    try {
      await this.apartmentService.createApartment(createApartmentDto);
      return { message: "Apartment successfully created" };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error creating apartment' });
    }
  }

  @Post('assignOptionToApartment')
  @ApiOperation({ summary: "Assign an option or more to an apartment" })
  @ApiCreatedResponse({
    description: 'Option successfully added to the apartment',
    type: AssignOptionExample
  })
  @ApiBadRequestResponse({
    description: 'Error adding option',
    schema: {
      example: {
        message: 'Error adding option'
      }
    }
  })
  @ApiBadRequestResponse({ description: 'Error adding option' })
  async assignOption(@Body() assignOptionDto: AssignOptionDto) {
    try {
      await this.apartmentService.assignOption(assignOptionDto);
      return { message: "Option successfully added to the apartment" };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error adding option' });
    }
  }

  @Post(':apartmentId/assignTenant')
  @ApiOperation({ summary: "Assign a tenant or more to an apartment" })
  @ApiCreatedResponse({
    description: 'Tenant successfully add to Apartment tenant list',
    type: AssignTenantDto
  })
  @ApiBadRequestResponse({
    description: 'Error associating tenant',
    schema: {
      example: {
        message: 'Error associating tenant'
      }
    }
  })
  async assignTenant(@Body() assignApartmentDto: AssignTenantDto, @Param('apartmentId') apartmentId: number) {
    try {
      await this.apartmentService.assignTenant(apartmentId, assignApartmentDto);
      return { message: "Tenant successfully add to Apartment tenant list" };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error associating tenant' });
    }
  }

  @Put(':id/updateApartment')
  @ApiOperation({ summary: "update an apartment" })
  @ApiCreatedResponse({
    description: 'Apartment successfully updated',
    schema: {
      example: {
        message: 'Apartment successfully updated'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Error updating apartment',
    schema: {
      example: {
        message: 'Error updating apartment'
      }
    }
  })
  async updateBuilding(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApartmentDto: CreateApartmentDto
  ) {
    try {
      await this.apartmentService.updateApartment(id, updateApartmentDto)
      return { message: 'Apartment successfully updated' }
    } catch (error) {
      throw new BadRequestException({ message: 'Error updating apartment' });
    }
  }

  @Delete(':apartmentId/removeTenant')
  @ApiOperation({ summary: "Remove a tenant or more from an apartment" })
  @ApiOkResponse({
    description: 'Tenants successfully removed from the apartment',
    type: DeleteTenantExample
  })
  @ApiBadRequestResponse({
    description: 'Error removing tenants',
    schema: {
      example: {
        message: 'Error removing tenants'
      }
    }
  })
  @ApiBadRequestResponse({ description: 'Error removing tenants' })
  async removeTenantFromApartment(@Body() deleteTenantDto: DeleteTenantDto, @Param('apartmentId') apartmentId: number) {
    try {
      const { tenantIds } = deleteTenantDto;
      await this.apartmentService.removeTenantFromApartment(apartmentId, tenantIds);
      return { message: "Tenants successfully removed from the apartment" };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error removing tenants' });
    }
  }

  @Delete(':apartmentId/deleteApartment')
  @ApiOperation({ summary: "Delete an apartment" })
  @ApiCreatedResponse({
    description: 'Apartment successfully deleted',
    schema: {
      example: {
        message: 'Apartment successfully deleted'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Error deleting apartment',
    schema: {
      example: {
        message: 'Error deleting apartment'
      }
    }
  })
  async deleteApartment(@Param('apartmentId', ParseIntPipe) apartmentId: number) {
    try {
      await this.apartmentService.deleteApartment(apartmentId);
      return { message: "Apartment successfully deleted" };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error deleting apartment' });
    }
  }
}
