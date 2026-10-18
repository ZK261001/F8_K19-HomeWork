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
    description: 'ID danh mục ngành nghề',
    example: 1,
  })
  @IsInt({ message: 'category_id phải là số nguyên' })
  category_id: number;

  @ApiProperty({
    description: 'ID công ty',
    example: 1,
  })
  @IsInt({ message: 'company_id phải là số nguyên' })
  company_id: number;

  @ApiProperty({
    description: 'Tiêu đề công việc',
    example: 'Frontend Developer (ReactJS)',
  })
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @ApiProperty({
    description: 'Mô tả công việc',
    example: 'Phát triển giao diện web bằng ReactJS',
  })
  @IsString({ message: 'Mô tả phải là chuỗi' })
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;

  @ApiProperty({
    description: 'Yêu cầu ứng viên',
    example: 'Thành thạo HTML, CSS, JavaScript, ReactJS',
  })
  @IsString({ message: 'Yêu cầu phải là chuỗi' })
  @IsNotEmpty({ message: 'Yêu cầu không được để trống' })
  requirement: string;

  @ApiProperty({
    description: 'Quyền lợi',
    example: 'Lương tháng 13, bảo hiểm đầy đủ',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Quyền lợi phải là chuỗi' })
  benefit?: string;

  @ApiProperty({
    description: 'Số năm kinh nghiệm',
    example: 1,
  })
  @IsInt({ message: 'Số năm kinh nghiệm phải là số nguyên' })
  @Min(0, { message: 'Số năm kinh nghiệm không được âm' })
  experience: number;

  @ApiProperty({
    description: 'Hạn nộp hồ sơ (YYYY-MM-DD)',
    example: '2026-12-31',
  })
  @IsDateString({}, { message: 'Hạn nộp phải có dạng YYYY-MM-DD' })
  due_date: string;

  @ApiProperty({
    description: 'Số lượng tuyển',
    example: 2,
  })
  @IsInt({ message: 'Số lượng tuyển phải là số nguyên' })
  @Min(1, { message: 'Số lượng tuyển ít nhất là 1' })
  quantity: number;

  @ApiProperty({
    description: 'Lương tối thiểu (VNĐ)',
    example: 10000000,
  })
  @IsInt({ message: 'Lương tối thiểu phải là số nguyên' })
  @Min(0, { message: 'Lương tối thiểu không được âm' })
  min_salary: number;

  @ApiProperty({
    description: 'Lương tối đa (VNĐ)',
    example: 20000000,
  })
  @IsInt({ message: 'Lương tối đa phải là số nguyên' })
  @Min(0, { message: 'Lương tối đa không được âm' })
  max_salary: number;

  @ApiProperty({
    description: 'Trình độ',
    enum: QUALIFICATIONS,
    example: 'Đại học',
  })
  @IsIn(QUALIFICATIONS, {
    message: `Trình độ phải là một trong: ${QUALIFICATIONS.join(', ')}`,
  })
  qualification: Qualification;

  @ApiProperty({
    description: 'Hình thức làm việc',
    enum: WORK_TYPES,
    example: 'Full-time',
  })
  @IsIn(WORK_TYPES, {
    message: `Hình thức làm việc phải là một trong: ${WORK_TYPES.join(', ')}`,
  })
  work_type: WorkType;

  @ApiProperty({
    description: 'Thời gian làm việc',
    example: 'Thứ 2 - Thứ 6, 8:00 - 17:00',
  })
  @IsString({ message: 'Thời gian làm việc phải là chuỗi' })
  @IsNotEmpty({ message: 'Thời gian làm việc không được để trống' })
  working_time: string;
}
