import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment_type } from 'src/@entities/type_apartment.entity';
import { CreateTypeParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {

  constructor(@InjectRepository(Apartment_type) private typeRepository: Repository<Apartment_type>) {}

  findType() {
    return this.typeRepository.find({relations: ['apartment']});
  }

  async createType(typeDetails: CreateTypeParams) {

    const newType = this.typeRepository.create({
        ...typeDetails,
    });
    const type = await this.typeRepository.save(newType);

    return type;
  }
}
