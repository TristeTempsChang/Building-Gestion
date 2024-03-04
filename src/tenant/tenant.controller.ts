import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Tenant } from 'src/@entities/tenant.entity';
import { CreateOptionDto } from 'src/option/dtos/CreateOption.dto';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {

  constructor(private tenantService: TenantService){}

  //For getting a list of all types
  @Get('getTenants')
  @ApiOperation({summary: "Get all tenants"})
  @ApiOkResponse({description: 'Display all tenants of the app'})
  @ApiBadRequestResponse({ description: 'Tenant not found' })
  getTenant(){
      return this.tenantService.findTenant();
  }

  @Get(':tenantId/getTenantById')
  @ApiOperation({summary: "Get a tenant"})
  @ApiOkResponse({ description: 'Display tenant by id' })
  @ApiBadRequestResponse({ description: 'Tenant not found' })
  async getTenantById(@Param('tenantId') tenantId: number): Promise<any> {
    try {
      const res = await this.tenantService.findTenantById(tenantId);
      return res
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Error fetching tenant data' });
    }
  }

  //For create tenant
  @Post('createTenant')
  @ApiOperation({summary: "Create a tenant"})
  @ApiCreatedResponse({
      description: 'Tenant successfully created',
      type: Tenant
  })
  @ApiBadRequestResponse({ 
    description: 'Error creating tenant',
    schema: {
      example: {
        message: 'Error creating tenant'
      }
    }
  })
  async createTenant(@Body() createTenantDto: CreateOptionDto){
      try {
        await this.tenantService.createTenant(createTenantDto);
        return { message: "Tenant successfully created" };
      } catch (error) {
          console.error(error);
          throw new BadRequestException({ message: 'Error creating tenant' });
      }
  }

  @Put(':id/updateTenant')
  @ApiOperation({summary: "update a tenant"})
  @ApiCreatedResponse({
    description: 'Tenant successfully updated',
    schema: {
      example: {
        message: 'Tenant successfully updated'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Error updating tenant',
    schema: {
      example: {
        message: 'Error updating tenant'
      }
    }
  })
  async updateTenantById(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTenantDto: CreateOptionDto
      ){
      try {
        await this.tenantService.updateTenant(id, updateTenantDto)
        return{ message: 'Tenant successfully updated' };
      } catch (error) {
          throw new BadRequestException({ message: 'Error updating tenant' });
      }
  }

  @Delete(':id/deleteTenant')
  @ApiOperation({summary: "delete a tenant"})
  @ApiCreatedResponse({
    description: 'Tenant successfully deleted',
    schema: {
      example: {
        message: 'Tenant successfully deleted'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Error deleting tenant',
    schema: {
      example: {
        message: 'Error deleting tenant'
      }
    }
  })
  async deleteTenantById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.tenantService.deleteTenant(id);
      return { message: 'Tenant successfully deleted' };
    } catch (error) {
      console.log(error)
      throw new BadRequestException({ message: 'Error deleting tenant' });
    }
  }
}
