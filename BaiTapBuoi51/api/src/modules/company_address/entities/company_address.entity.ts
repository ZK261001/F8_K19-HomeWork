import { ApiProperty } from '@nestjs/swagger';

export class CompanyAddress {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  company_id: number;

  @ApiProperty({ example: 1 })
  province_id: number;

  @ApiProperty({ example: 1 })
  ward_id: number;

  @ApiProperty({ example: 'Số 1 Đường ABC' })
  address_detail: string;
}
