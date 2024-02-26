import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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

    @Put(':id/updateOptions')
    @ApiBadRequestResponse({ description: 'Error updating type' })
    async updateTypeById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOptionDto: CreateOptionDto
        ){
        try {
            await this.optionService.updateOptios(id, updateOptionDto)
            return{ message: 'Option successfully updated' };
        } catch (error) {
            throw new BadRequestException({ message: 'Error updating option' });
        }
    }

    @Delete(':id/deleteOptions')
    @ApiOkResponse({ description: 'Option successfully deleted' })
    @ApiBadRequestResponse({ description: 'Error deleting tenant' })
    async deleteTenantById(@Param('id', ParseIntPipe) id: number) {
        try {
        await this.optionService.deleteOption(id);
        return { message: 'Option successfully deleted' };
        } catch (error) {
        console.log(error)
        throw new BadRequestException({ message: 'Error deleting option' });
        }
    }
}
