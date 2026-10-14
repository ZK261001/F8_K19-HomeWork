import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { Ward } from './entities/ward.entity';

@Injectable()
export class WardService {
  private wards: Ward[] = [
    { id: 1, province_id: 29, name: 'Phường Phúc Xá' },
    { id: 2, province_id: 29, name: 'Phường Trúc Bạch' },
    { id: 3, province_id: 29, name: 'Phường Vĩnh Phúc' },
    { id: 4, province_id: 29, name: 'Phường Cống Vị' },
    { id: 5, province_id: 29, name: 'Phường Liễu Giai' },
    { id: 6, province_id: 29, name: 'Phường Nguyễn Trung Trực' },
    { id: 7, province_id: 29, name: 'Phường Quán Thánh' },
    { id: 8, province_id: 29, name: 'Phường Thành Công' },
    { id: 9, province_id: 29, name: 'Phường Điện Biên' },
    { id: 10, province_id: 29, name: 'Phường Đội Cấn' },
  ];

  findAll() {
    return this.wards;
  }

  findOne(id: number) {
    const ward = this.wards.find((w) => w.id === id);
    if (!ward) {
      throw new NotFoundException(`Ward #${id} not found`);
    }

    return ward;
  }

  findByProvince(provinceId: number) {
    return this.wards.filter((w) => w.province_id === provinceId);
  }
}
