import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OptionService } from './option.service';
import { Option } from 'src/@entities/option.entity';
import { CreateOptionDto } from './dtos/CreateOption.dto';

@ApiTags('Options')
@Controller('option')
export class OptionController {

    constructor(private optionService: OptionService) { }

    //For getting a list of all options
    @Get('getOptions')
    @ApiOperation({summary: "Get all options"})
    @ApiOkResponse({ description: 'Display all options of the app' })
    @ApiBadRequestResponse({ description: 'Options not found' })
    getOptions() {
        return this.optionService.findOptions();
    }

    @Get(':optionId/getOptionById')
    @ApiOperation({summary: "Get one option"})
    @ApiOkResponse({ description: 'Display option by id' })
    @ApiBadRequestResponse({ description: 'Option not found' })
    async getOptionById(@Param('optionId') optionId: number): Promise<any> {
        try {
            const res = await this.optionService.findOptionById(optionId);
            return res
        } catch (error) {
            console.error(error);
            throw new BadRequestException({ message: 'Error fetching option data' });
        }
    }

    //For create options
    @Post('createOptions')
    @ApiOperation({summary: "Create an option"})
    @ApiCreatedResponse({
        description: 'Option successfully created',
        type: Option
    })
    @ApiBadRequestResponse({ 
        description: 'Error creating option...',
        schema: {
          example: {
            message: 'Error creating option...'
          }
        }
      })
    async createOptions(@Body() createOptionDto: CreateOptionDto) {
        try {
            await this.optionService.createOptions(createOptionDto);
            return { message: "Option successfully created" };
        } catch (error) {
            console.error(error);
            throw new BadRequestException({ message: 'Error creating option...' });
        }
    }

    @Put(':id/updateOptions')
    @ApiOperation({summary: "Update an option"})
    @ApiCreatedResponse({
        description: 'Option successfully updated',
        schema: {
          example: {
            message: 'Option successfully updated'
          }
        }
      })
      @ApiBadRequestResponse({ 
        description: 'Error updating option',
        schema: {
          example: {
            message: 'Error updating option'
          }
        }
      })
    async updateTypeById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOptionDto: CreateOptionDto
    ) {
        try {
            await this.optionService.updateOptios(id, updateOptionDto)
            return { message: 'Option successfully updated' };
        } catch (error) {
            throw new BadRequestException({ message: 'Error updating option' });
        }
    }

    @Delete(':id/deleteOptions')
    @ApiOperation({summary: "Delete an option"})
    @ApiCreatedResponse({
        description: 'Option successfully deleted',
        schema: {
          example: {
            message: 'Option successfully deleted'
          }
        }
      })
      @ApiBadRequestResponse({ 
        description: 'Error deleting option',
        schema: {
          example: {
            message: 'Error deleting option'
          }
        }
      })
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
