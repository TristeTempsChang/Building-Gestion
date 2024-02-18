import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from 'src/@entities/option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Option])
  ],
  providers: [OptionService],
  controllers: [OptionController]
})
export class OptionModule {}
