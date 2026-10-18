import { Gender } from '../entities/candidate.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCandidateDto {
  @ApiProperty({ example: 'Nguyễn Văn A', minLength: 2 })
  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @MinLength(2, { message: 'Tên phải có ít nhất 2 ký tự' })
  name: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  phone?: string;

  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({ enum: Gender, example: Gender.MALE, required: false })
  @IsOptional()
  @IsEnum(Gender, { message: 'Giới tính phải là male, female hoặc other' })
  gender?: Gender;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'province_id phải là số nguyên' })
  province_id?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'ward_id phải là số nguyên' })
  ward_id?: number;

  @ApiProperty({ example: 'Số 1 Đường ABC', required: false })
  @IsOptional()
  @IsString({ message: 'Địa chỉ chi tiết phải là chuỗi' })
  addressDetail?: string;
}
