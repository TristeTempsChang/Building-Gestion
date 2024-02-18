import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OptionService } from './option.service';
import { Option } from 'src/@entities/option.entity';
import { CreateOptionDto } from './dtos/CreateOption.dto';

@ApiTags('Options')
@Controller('option')
export class OptionController {

  constructor(private optionService: OptionService){}

    //For getting a list of all options
    @Get('getOptions')
    @ApiOkResponse({description: 'Display all options of the app'})
    @ApiBadRequestResponse({ description: 'Options not found' })
    getOptions(){
        return this.optionService.findOptions();
    }

    //For create options
    @Post('createOptions')
    @ApiCreatedResponse({
        description: 'Option successfully created',
        type: Option
    })
    @ApiBadRequestResponse({ description: 'Error creating options' })
    async createOptions(@Body() createOptionDto: CreateOptionDto){
        try {
          await this.optionService.createOptions(createOptionDto);
          return { message: "Option successfully created" };
        } catch (error) {
            console.error(error);
            throw new BadRequestException({ message: 'Error creating option...' });
        }
    }
}
