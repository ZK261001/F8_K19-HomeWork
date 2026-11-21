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
    description: 'Tax code',
    example: '0312345678',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tax code must be a string' })
  tax?: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Công ty TNHH F8',
  })
  @IsString({ message: 'Company name must be a string' })
  @IsNotEmpty({ message: 'Company name must not be empty' })
  name: string;

  @ApiProperty({
    description: 'English name',
    example: 'F8 Company Limited',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'English name must be a string' })
  name_eng?: string;

  @ApiProperty({
    description: 'Company description',
    example: 'Công ty chuyên đào tạo lập trình',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  desc?: string;

  @ApiProperty({
    description: 'Contact email',
    example: 'contact@f8.edu.vn',
  })
  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @ApiProperty({
    description: 'Phone number',
    example: '0901234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  phone?: string;

  @ApiProperty({
    description: 'Website',
    example: 'https://fullstack.edu.vn',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Website is invalid' })
  website?: string;

  @ApiProperty({
    description: 'Rating (0 - 5)',
    example: 4.5,
    minimum: 0,
    maximum: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must be at most 5' })
  rate?: number;
}
