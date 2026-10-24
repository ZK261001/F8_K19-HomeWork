import { Module } from '@nestjs/common';
import { CompanyAddressService } from './company_address.service';
import { CompanyAddressController } from './company_address.controller';

@Module({
  controllers: [CompanyAddressController],
  providers: [CompanyAddressService],
})
export class CompanyAddressModule {}
