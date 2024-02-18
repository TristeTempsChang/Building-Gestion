import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'src/@entities/option.entity';
import { CreateOptionParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService {

  constructor(@InjectRepository(Option) private optionRepository: Repository<Option>) {}

  findOptions() {
    return this.optionRepository.find({relations: ['apartment']});
  }

  async createOptions(optionDetails: CreateOptionParams) {

    const newOption = this.optionRepository.create({
        ...optionDetails
    });
    const option = await this.optionRepository.save(newOption);

    return option;
  }

}
