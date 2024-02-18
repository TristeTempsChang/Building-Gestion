import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/@entities/owner.entity';
import { CreateOwnerParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {

  constructor(@InjectRepository(Owner) private ownerRepository: Repository<Owner>) {}

  findOwners() {
    return this.ownerRepository.find({relations: ['apartments']});
  }

  async createOwner(ownerDetails: CreateOwnerParams) {

    const newOwner = this.ownerRepository.create({
        ...ownerDetails
    });
    const owner = await this.ownerRepository.save(newOwner);

    return owner;
  }

}
