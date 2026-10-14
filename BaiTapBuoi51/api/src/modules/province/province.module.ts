import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { WardModule } from '../ward/ward.module';

@Module({
  controllers: [ProvinceController],
  providers: [ProvinceService],
  imports: [WardModule],
})
export class ProvinceModule {}
