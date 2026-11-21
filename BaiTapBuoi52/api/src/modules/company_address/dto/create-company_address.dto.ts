import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyAddressDto {
  @ApiProperty({
    description: 'Company ID',
    example: 1,
  })
  @IsInt({ message: 'company_id must be an integer' })
  company_id: number;

  @ApiProperty({
    description: 'Province/city ID',
    example: 1,
  })
  @IsInt({ message: 'province_id must be an integer' })
  province_id: number;

  @ApiProperty({
    description: 'Ward ID',
    example: 1,
  })
  @IsInt({ message: 'ward_id must be an integer' })
  ward_id: number;

  @ApiProperty({
    description: 'Address detail',
    example: 'Số 1 Đường ABC',
  })
  @IsString({ message: 'Address detail must be a string' })
  @IsNotEmpty({ message: 'Address detail must not be empty' })
  address_detail: string;
}
