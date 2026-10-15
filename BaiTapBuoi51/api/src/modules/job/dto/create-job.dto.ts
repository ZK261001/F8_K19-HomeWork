import { ApiProperty } from '@nestjs/swagger';
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
  category_id: number;

  @ApiProperty({
    description: 'ID công ty',
    example: 1,
  })
  company_id: number;

  @ApiProperty({
    description: 'Tiêu đề công việc',
    example: 'Frontend Developer (ReactJS)',
  })
  title: string;

  @ApiProperty({
    description: 'Mô tả công việc',
    example: 'Phát triển giao diện web bằng ReactJS',
  })
  description: string;

  @ApiProperty({
    description: 'Yêu cầu ứng viên',
    example: 'Thành thạo HTML, CSS, JavaScript, ReactJS',
  })
  requirement: string;

  @ApiProperty({
    description: 'Quyền lợi',
    example: 'Lương tháng 13, bảo hiểm đầy đủ',
    required: false,
  })
  benefit?: string;

  @ApiProperty({
    description: 'Số năm kinh nghiệm',
    example: 1,
  })
  experience: number;

  @ApiProperty({
    description: 'Hạn nộp hồ sơ (YYYY-MM-DD)',
    example: '2026-12-31',
  })
  due_date: string;

  @ApiProperty({
    description: 'Số lượng tuyển',
    example: 2,
  })
  quantity: number;

  @ApiProperty({
    description: 'Lương tối thiểu (VNĐ)',
    example: 10000000,
  })
  min_salary: number;

  @ApiProperty({
    description: 'Lương tối đa (VNĐ)',
    example: 20000000,
  })
  max_salary: number;

  @ApiProperty({
    description: 'Trình độ',
    enum: QUALIFICATIONS,
    example: 'Đại học',
  })
  qualification: Qualification;

  @ApiProperty({
    description: 'Hình thức làm việc',
    enum: WORK_TYPES,
    example: 'Full-time',
  })
  work_type: WorkType;

  @ApiProperty({
    description: 'Thời gian làm việc',
    example: 'Thứ 2 - Thứ 6, 8:00 - 17:00',
  })
  working_time: string;
}
