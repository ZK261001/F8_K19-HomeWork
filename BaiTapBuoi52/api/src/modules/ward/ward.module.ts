import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { Ward } from './entities/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ward])],
  controllers: [WardController],
  providers: [WardService],
  exports: [WardService],
})
export class WardModule {}
