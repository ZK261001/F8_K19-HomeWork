import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';
import { WardService } from '../ward/ward.service';

@Injectable()
export class ProvinceService {
  constructor(private readonly wardService: WardService) {}
  private provinces: Province[] = [
    { id: 29, name: 'Thành phố Hà Nội' },
    { id: 23, name: 'Tỉnh Hà Giang' },
    { id: 11, name: 'Tỉnh Cao Bằng' },
    { id: 97, name: 'Tỉnh Bắc Kạn' },
    { id: 22, name: 'Tỉnh Tuyên Quang' },
    { id: 24, name: 'Tỉnh Lào Cai' },
    { id: 27, name: 'Tỉnh Điện Biên' },
    { id: 25, name: 'Tỉnh Lai Châu' },
    { id: 26, name: 'Tỉnh Sơn La' },
    { id: 21, name: 'Tỉnh Yên Bái' },
    { id: 28, name: 'Tỉnh Hoà Bình' },
    { id: 20, name: 'Tỉnh Thái Nguyên' },
    { id: 12, name: 'Tỉnh Lạng Sơn' },
    { id: 14, name: 'Tỉnh Quảng Ninh' },
    { id: 98, name: 'Tỉnh Bắc Giang' },
    { id: 19, name: 'Tỉnh Phú Thọ' },
    { id: 88, name: 'Tỉnh Vĩnh Phúc' },
    { id: 99, name: 'Tỉnh Bắc Ninh' },
    { id: 34, name: 'Tỉnh Hải Dương' },
    { id: 15, name: 'Thành phố Hải Phòng' },
    { id: 89, name: 'Tỉnh Hưng Yên' },
    { id: 17, name: 'Tỉnh Thái Bình' },
    { id: 90, name: 'Tỉnh Hà Nam' },
    { id: 18, name: 'Tỉnh Nam Định' },
    { id: 35, name: 'Tỉnh Ninh Bình' },
    { id: 36, name: 'Tỉnh Thanh Hóa' },
    { id: 37, name: 'Tỉnh Nghệ An' },
    { id: 38, name: 'Tỉnh Hà Tĩnh' },
    { id: 73, name: 'Tỉnh Quảng Bình' },
    { id: 74, name: 'Tỉnh Quảng Trị' },
    { id: 75, name: 'Tỉnh Thừa Thiên Huế' },
    { id: 43, name: 'Thành phố Đà Nẵng' },
    { id: 92, name: 'Tỉnh Quảng Nam' },
    { id: 76, name: 'Tỉnh Quảng Ngãi' },
    { id: 77, name: 'Tỉnh Bình Định' },
    { id: 78, name: 'Tỉnh Phú Yên' },
    { id: 79, name: 'Tỉnh Khánh Hòa' },
    { id: 85, name: 'Tỉnh Ninh Thuận' },
    { id: 86, name: 'Tỉnh Bình Thuận' },
    { id: 82, name: 'Tỉnh Kon Tum' },
    { id: 81, name: 'Tỉnh Gia Lai' },
    { id: 47, name: 'Tỉnh Đắk Lắk' },
    { id: 48, name: 'Tỉnh Đắk Nông' },
    { id: 49, name: 'Tỉnh Lâm Đồng' },
    { id: 93, name: 'Tỉnh Bình Phước' },
    { id: 70, name: 'Tỉnh Tây Ninh' },
    { id: 61, name: 'Tỉnh Bình Dương' },
    { id: 60, name: 'Tỉnh Đồng Nai' },
    { id: 72, name: 'Tỉnh Bà Rịa - Vũng Tàu' },
    { id: 50, name: 'Thành phố Hồ Chí Minh' },
    { id: 62, name: 'Tỉnh Long An' },
    { id: 63, name: 'Tỉnh Tiền Giang' },
    { id: 71, name: 'Tỉnh Bến Tre' },
    { id: 84, name: 'Tỉnh Trà Vinh' },
    { id: 64, name: 'Tỉnh Vĩnh Long' },
    { id: 66, name: 'Tỉnh Đồng Tháp' },
    { id: 67, name: 'Tỉnh An Giang' },
    { id: 68, name: 'Tỉnh Kiên Giang' },
    { id: 65, name: 'Thành phố Cần Thơ' },
    { id: 95, name: 'Tỉnh Hậu Giang' },
    { id: 83, name: 'Tỉnh Sóc Trăng' },
    { id: 94, name: 'Tỉnh Bạc Liêu' },
    { id: 69, name: 'Tỉnh Cà Mau' },
  ];

  findAll() {
    return this.provinces;
  }

  findOne(id: number) {
    const province = this.provinces.find((p) => p.id === id);
    if (!province) {
      throw new NotFoundException(`Province #${id} not found`);
    }
    return {
      ...province,
      wards: this.wardService.findByProvince(id),
    };
  }
}
