import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dtos/CreateOwner.dto';
import { Owner } from 'src/@entities/owner.entity';

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
}
