import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../Base/entity';

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

@Entity('jobs')
export class Job extends BaseEntity {
  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  category_id: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  company_id: number;

  @ApiProperty({ example: 'Frontend Developer (ReactJS)' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: 'Phát triển giao diện web bằng ReactJS' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'Thành thạo HTML, CSS, JavaScript, ReactJS' })
  @Column({ type: 'text' })
  requirement: string;

  @ApiProperty({ example: 'Lương tháng 13, bảo hiểm đầy đủ', required: false })
  @Column({ type: 'text', nullable: true })
  benefit?: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 0 })
  experience: number;

  @ApiProperty({ example: '2026-12-31' })
  @Column({ type: 'date' })
  due_date: string;

  @ApiProperty({ example: 2 })
  @Column({ type: 'int', default: 1 })
  quantity: number;

  @ApiProperty({ example: 10000000 })
  @Column({ type: 'int' })
  min_salary: number;

  @ApiProperty({ example: 20000000 })
  @Column({ type: 'int' })
  max_salary: number;

  @ApiProperty({ enum: QUALIFICATIONS, example: 'Đại học' })
  @Column({ type: 'enum', enum: QUALIFICATIONS })
  qualification: Qualification;

  @ApiProperty({ enum: WORK_TYPES, example: 'Full-time' })
  @Column({ type: 'enum', enum: WORK_TYPES })
  work_type: WorkType;

  @ApiProperty({ example: 'Thứ 2 - Thứ 6, 8:00 - 17:00' })
  @Column({ type: 'varchar', length: 255 })
  working_time: string;
}
