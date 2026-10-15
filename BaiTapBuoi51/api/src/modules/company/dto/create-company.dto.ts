import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Mã số thuế',
    example: '0312345678',
    required: false,
  })
  tax?: string;

  @ApiProperty({
    description: 'Tên công ty',
    example: 'Công ty TNHH F8',
  })
  name: string;

  @ApiProperty({
    description: 'Tên tiếng Anh',
    example: 'F8 Company Limited',
    required: false,
  })
  name_eng?: string;

  @ApiProperty({
    description: 'Mô tả công ty',
    example: 'Công ty chuyên đào tạo lập trình',
    required: false,
  })
  desc?: string;

  @ApiProperty({
    description: 'Email liên hệ',
    example: 'contact@f8.edu.vn',
  })
  email: string;

  @ApiProperty({
    description: 'Số điện thoại',
    example: '0901234567',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'Website',
    example: 'https://fullstack.edu.vn',
    required: false,
  })
  website?: string;

  @ApiProperty({
    description: 'Đánh giá (0 - 5)',
    example: 4.5,
    minimum: 0,
    maximum: 5,
    required: false,
  })
  rate?: number;
}
