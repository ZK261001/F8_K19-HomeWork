import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { WardModule } from '../ward/ward.module';
import { Province } from './entities/province.entity';

@Module({
  controllers: [ProvinceController],
  providers: [ProvinceService],
  imports: [TypeOrmModule.forFeature([Province]), WardModule],
})
export class ProvinceModule {}
