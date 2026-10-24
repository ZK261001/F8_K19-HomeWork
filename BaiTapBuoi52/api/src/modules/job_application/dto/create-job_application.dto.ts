import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import {
  JOB_APPLICATION_STATUSES,
  type JobApplicationStatus,
} from '../entities/job_application.entity';

export class CreateJobApplicationDto {
  @ApiProperty({
    description: 'ID công việc',
    example: 1,
  })
  @IsInt({ message: 'job_id phải là số nguyên' })
  job_id: number;

  @ApiProperty({
    description: 'ID ứng viên',
    example: 1,
  })
  @IsInt({ message: 'candidate_id phải là số nguyên' })
  candidate_id: number;

  @ApiProperty({
    description: 'ID CV',
    example: 1,
  })
  @IsInt({ message: 'cv_id phải là số nguyên' })
  cv_id: number;

  @ApiProperty({
    description: 'Thư giới thiệu / ghi chú',
    example: 'Tôi rất mong muốn được làm việc tại quý công ty',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Thư giới thiệu phải là chuỗi' })
  description?: string;

  @ApiProperty({
    description: 'Trạng thái hồ sơ (mặc định PENDING)',
    enum: JOB_APPLICATION_STATUSES,
    example: 'PENDING',
    required: false,
  })
  @IsOptional()
  @IsIn(JOB_APPLICATION_STATUSES, {
    message: `Trạng thái phải là một trong: ${JOB_APPLICATION_STATUSES.join(', ')}`,
  })
  status?: JobApplicationStatus;
}
