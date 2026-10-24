import { ApiProperty } from '@nestjs/swagger';

export const QUALIFICATIONS = [
  'Trung cấp',
  'Cao đẳng',
  'Đại học',
  'Thạc sĩ',
  'Tiến sĩ',
] as const;
export type Qualification = (typeof QUALIFICATIONS)[number];

export const WORK_TYPES = [
  'Full-time',
  'Part-time',
  'Remote',
  'Hybrid',
  'Freelance',
] as const;
export type WorkType = (typeof WORK_TYPES)[number];

export class Job {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  category_id: number;

  @ApiProperty({ example: 1 })
  company_id: number;

  @ApiProperty({ example: 'Frontend Developer (ReactJS)' })
  title: string;

  @ApiProperty({ example: 'Phát triển giao diện web bằng ReactJS' })
  description: string;

  @ApiProperty({ example: 'Thành thạo HTML, CSS, JavaScript, ReactJS' })
  requirement: string;

  @ApiProperty({ example: 'Lương tháng 13, bảo hiểm đầy đủ', required: false })
  benefit?: string;

  @ApiProperty({ example: 1 })
  experience: number;

  @ApiProperty({ example: '2026-12-31' })
  due_date: string;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 10000000 })
  min_salary: number;

  @ApiProperty({ example: 20000000 })
  max_salary: number;

  @ApiProperty({ enum: QUALIFICATIONS, example: 'Đại học' })
  qualification: Qualification;

  @ApiProperty({ enum: WORK_TYPES, example: 'Full-time' })
  work_type: WorkType;

  @ApiProperty({ example: 'Thứ 2 - Thứ 6, 8:00 - 17:00' })
  working_time: string;
}
