import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment_type } from 'src/@entities/type_apartment.entity';
import { CreateTypeParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {

  constructor(@InjectRepository(Apartment_type) private typeRepository: Repository<Apartment_type>) {}

  findType() {
    return this.typeRepository.find();
  }

  async findTypeById(id: number){
    return this.typeRepository.findOne({ 
      where: { id: id }
    });
  }

  async createType(typeDetails: CreateTypeParams) {

    const newType = this.typeRepository.create({
        ...typeDetails,
    });
    const type = await this.typeRepository.save(newType);

    return type;
  }

  async updateType(id: number, typeDetails: CreateTypeParams) {

    const update = await this.typeRepository.update(
      { id }, 
      { ...typeDetails
    });

    return update
  }

  async deleteType(id: number) {
    const result = await this.typeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }
    return { message: 'Type successfully deleted' };
  }
}
