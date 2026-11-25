import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../Base/service';
import { WardService } from '../ward/ward.service';
import { Province, ProvinceDetail } from './entities/province.entity';
import { PROVINCE_SEED } from './province.seed';

@Injectable()
export class ProvinceService
  extends BaseService<Province>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(Province)
    repository: Repository<Province>,
    private readonly wardService: WardService,
  ) {
    super(repository);
  }

  async onModuleInit() {
    if ((await this.repository.count()) === 0) {
      await this.repository.insert(PROVINCE_SEED);
    }
  }

  async findOne(id: number): Promise<ProvinceDetail> {
    const province = await super.findOne(id);
    return {
      ...province,
      wards: await this.wardService.findByProvince(id),
    };
  }
}
