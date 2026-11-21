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
import { Gender } from '../entities/candidate.entity';

export class CreateCandidateDto {
  @ApiProperty({ example: 'Nguyễn Văn A', minLength: 2 })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @ApiProperty({ example: '0123456789', required: false })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  phone?: string;

  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @ApiProperty({ enum: Gender, example: Gender.MALE, required: false })
  @IsOptional()
  @IsEnum(Gender, { message: 'Gender must be male, female or other' })
  gender?: Gender;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'province_id must be an integer' })
  province_id?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'ward_id must be an integer' })
  ward_id?: number;

  @ApiProperty({ example: 'Số 1 Đường ABC', required: false })
  @IsOptional()
  @IsString({ message: 'Address detail must be a string' })
  addressDetail?: string;
}
