import { ApiProperty } from '@nestjs/swagger';
import { Ward } from '../../ward/entities/ward.entity';

export class Province {
  @ApiProperty({ example: 29 })
  id: number;

  @ApiProperty({ example: 'Thành phố Hà Nội' })
  name: string;
}

export class ProvinceDetail extends Province {
  @ApiProperty({ type: [Ward] })
  wards: Ward[];
}
