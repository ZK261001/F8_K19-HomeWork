import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../Base/service';
import { Ward } from './entities/ward.entity';
import { WARD_SEED } from './ward.seed';

@Injectable()
export class WardService extends BaseService<Ward> implements OnModuleInit {
  constructor(
    @InjectRepository(Ward)
    repository: Repository<Ward>,
  ) {
    super(repository);
  }

  async onModuleInit() {
    if ((await this.repository.count()) === 0) {
      await this.repository.insert(WARD_SEED);
    }
  }

  findByProvince(provinceId: number): Promise<Ward[]> {
    return this.repository.find({
      where: { province_id: provinceId, active: true },
    });
  }
}
