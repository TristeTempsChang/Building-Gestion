import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'src/@entities/option.entity';
import { CreateOptionParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService {

  constructor(@InjectRepository(Option) private optionRepository: Repository<Option>) {}

  findOptions() {
    return this.optionRepository.find();
  }

  async findOptionById(id: number){
    return this.optionRepository.findOne({ 
      where: { id: id }
    });
  }

  async createOptions(optionDetails: CreateOptionParams) {

    const newOption = this.optionRepository.create({
        ...optionDetails
    });
    const option = await this.optionRepository.save(newOption);

    return option;
  }

  async updateOptios(id: number, optionDetails: CreateOptionParams) {

    const update = await this.optionRepository.update(
      { id }, 
      { ...optionDetails
    });
    
    return update
  }

  async deleteOption(id: number) {
    const result = await this.optionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Options with ID ${id} not found`);
    }
    return { message: 'Options successfully deleted' };
  }

}
