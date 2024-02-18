import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
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
}
