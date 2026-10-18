import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Mã số thuế',
    example: '0312345678',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Mã số thuế phải là chuỗi' })
  tax?: string;

  @ApiProperty({
    description: 'Tên công ty',
    example: 'Công ty TNHH F8',
  })
  @IsString({ message: 'Tên công ty phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên công ty không được để trống' })
  name: string;

  @ApiProperty({
    description: 'Tên tiếng Anh',
    example: 'F8 Company Limited',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tên tiếng Anh phải là chuỗi' })
  name_eng?: string;

  @ApiProperty({
    description: 'Mô tả công ty',
    example: 'Công ty chuyên đào tạo lập trình',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  desc?: string;

  @ApiProperty({
    description: 'Email liên hệ',
    example: 'contact@f8.edu.vn',
  })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({
    description: 'Số điện thoại',
    example: '0901234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  phone?: string;

  @ApiProperty({
    description: 'Website',
    example: 'https://fullstack.edu.vn',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Website không hợp lệ' })
  website?: string;

  @ApiProperty({
    description: 'Đánh giá (0 - 5)',
    example: 4.5,
    minimum: 0,
    maximum: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Đánh giá phải là số' })
  @Min(0, { message: 'Đánh giá thấp nhất là 0' })
  @Max(5, { message: 'Đánh giá cao nhất là 5' })
  rate?: number;
}
