import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyAddressDto {
  @ApiProperty({
    description: 'ID công ty',
    example: 1,
  })
  @IsInt({ message: 'company_id phải là số nguyên' })
  company_id: number;

  @ApiProperty({
    description: 'ID tỉnh/thành phố',
    example: 1,
  })
  @IsInt({ message: 'province_id phải là số nguyên' })
  province_id: number;

  @ApiProperty({
    description: 'ID phường/xã',
    example: 1,
  })
  @IsInt({ message: 'ward_id phải là số nguyên' })
  ward_id: number;

  @ApiProperty({
    description: 'Địa chỉ chi tiết',
    example: 'Số 1 Đường ABC',
  })
  @IsString({ message: 'Địa chỉ chi tiết phải là chuỗi' })
  @IsNotEmpty({ message: 'Địa chỉ chi tiết không được để trống' })
  address_detail: string;
}
