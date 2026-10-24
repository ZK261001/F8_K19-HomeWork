import { ApiProperty } from '@nestjs/swagger';

export class Company {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '0312345678', required: false })
  tax?: string;

  @ApiProperty({ example: 'Công ty TNHH F8' })
  name: string;

  @ApiProperty({ example: 'F8 Company Limited', required: false })
  name_eng?: string;

  @ApiProperty({ example: 'Công ty chuyên đào tạo lập trình', required: false })
  desc?: string;

  @ApiProperty({ example: 'contact@f8.edu.vn' })
  email: string;

  @ApiProperty({ example: '0901234567', required: false })
  phone?: string;

  @ApiProperty({ example: 'https://fullstack.edu.vn', required: false })
  website?: string;

  @ApiProperty({ example: 4.5, required: false })
  rate?: number;
}
