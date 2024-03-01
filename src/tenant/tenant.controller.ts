import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Tenant } from 'src/@entities/tenant.entity';
import { CreateOptionDto } from 'src/option/dtos/CreateOption.dto';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {

  constructor(private tenantService: TenantService){}

  //For getting a list of all types
  @Get('getTenants')
  @ApiOkResponse({description: 'Display all tenants of the app'})
  @ApiBadRequestResponse({ description: 'Tenant not found' })
  getTenant(){
      return this.tenantService.findTenant();
  }

  @Get(':tenantId/getTenantById')
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
  @ApiCreatedResponse({
      description: 'Tenant successfully created',
      type: Tenant
  })
  @ApiBadRequestResponse({ description: 'Error creating tenant' })
  async createTenant(@Body() createTenantDto: CreateOptionDto){
      try {
        await this.tenantService.createTenant(createTenantDto);
        return { message: "Tenant successfully created" };
      } catch (error) {
          console.error(error);
          throw new BadRequestException({ message: 'Error creating building' });
      }
  }

  @Put(':id/updateTenant')
  @ApiBadRequestResponse({ description: 'Error updating tenant' })
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
  @ApiOkResponse({ description: 'Tenant successfully deleted' })
  @ApiBadRequestResponse({ description: 'Error deleting tenant' })
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
