import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  QUALIFICATIONS,
  WORK_TYPES,
  type Qualification,
  type WorkType,
} from '../entities/job.entity';

export class CreateJobDto {
  @ApiProperty({
    description: 'Job category ID',
    example: 1,
  })
  @IsInt({ message: 'category_id must be an integer' })
  category_id: number;

  @ApiProperty({
    description: 'Company ID',
    example: 1,
  })
  @IsInt({ message: 'company_id must be an integer' })
  company_id: number;

  @ApiProperty({
    description: 'Job title',
    example: 'Frontend Developer (ReactJS)',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  title: string;

  @ApiProperty({
    description: 'Job description',
    example: 'Phát triển giao diện web bằng ReactJS',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description must not be empty' })
  description: string;

  @ApiProperty({
    description: 'Candidate requirements',
    example: 'Thành thạo HTML, CSS, JavaScript, ReactJS',
  })
  @IsString({ message: 'Requirement must be a string' })
  @IsNotEmpty({ message: 'Requirement must not be empty' })
  requirement: string;

  @ApiProperty({
    description: 'Benefits',
    example: 'Lương tháng 13, bảo hiểm đầy đủ',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Benefit must be a string' })
  benefit?: string;

  @ApiProperty({
    description: 'Years of experience',
    example: 1,
  })
  @IsInt({ message: 'Years of experience must be an integer' })
  @Min(0, { message: 'Years of experience must not be negative' })
  experience: number;

  @ApiProperty({
    description: 'Application deadline (YYYY-MM-DD)',
    example: '2026-12-31',
  })
  @IsDateString({}, { message: 'Due date must be in YYYY-MM-DD format' })
  due_date: string;

  @ApiProperty({
    description: 'Number of openings',
    example: 2,
  })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @ApiProperty({
    description: 'Minimum salary (VND)',
    example: 10000000,
  })
  @IsInt({ message: 'Minimum salary must be an integer' })
  @Min(0, { message: 'Minimum salary must not be negative' })
  min_salary: number;

  @ApiProperty({
    description: 'Maximum salary (VND)',
    example: 20000000,
  })
  @IsInt({ message: 'Maximum salary must be an integer' })
  @Min(0, { message: 'Maximum salary must not be negative' })
  max_salary: number;

  @ApiProperty({
    description: 'Qualification',
    enum: QUALIFICATIONS,
    example: 'Đại học',
  })
  @IsIn(QUALIFICATIONS, {
    message: `Qualification must be one of: ${QUALIFICATIONS.join(', ')}`,
  })
  qualification: Qualification;

  @ApiProperty({
    description: 'Work type',
    enum: WORK_TYPES,
    example: 'Full-time',
  })
  @IsIn(WORK_TYPES, {
    message: `Work type must be one of: ${WORK_TYPES.join(', ')}`,
  })
  work_type: WorkType;

  @ApiProperty({
    description: 'Working time',
    example: 'Thứ 2 - Thứ 6, 8:00 - 17:00',
  })
  @IsString({ message: 'Working time must be a string' })
  @IsNotEmpty({ message: 'Working time must not be empty' })
  working_time: string;
}
