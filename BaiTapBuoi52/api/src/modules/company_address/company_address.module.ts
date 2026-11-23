import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyAddressService } from './company_address.service';
import { CompanyAddressController } from './company_address.controller';
import { CompanyAddress } from './entities/company_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyAddress])],
  controllers: [CompanyAddressController],
  providers: [CompanyAddressService],
})
export class CompanyAddressModule {}
