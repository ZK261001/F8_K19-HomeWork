import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../Base/service';
import { CompanyAddress } from './entities/company_address.entity';

@Injectable()
export class CompanyAddressService extends BaseService<CompanyAddress> {
  constructor(
    @InjectRepository(CompanyAddress)
    repository: Repository<CompanyAddress>,
  ) {
    super(repository);
  }
}
