import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyAddressDto {
  @ApiProperty({
    description: 'ID công ty',
    example: 1,
  })
  company_id: number;

  @ApiProperty({
    description: 'ID tỉnh/thành phố',
    example: 1,
  })
  province_id: number;

  @ApiProperty({
    description: 'ID phường/xã',
    example: 1,
  })
  ward_id: number;

  @ApiProperty({
    description: 'Địa chỉ chi tiết',
    example: 'Số 1 Đường ABC',
  })
  address_detail: string;
}
