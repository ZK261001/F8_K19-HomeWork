import { ApiProperty } from '@nestjs/swagger';
import {
  JOB_APPLICATION_STATUSES,
  type JobApplicationStatus,
} from '../entities/job_application.entity';

export class CreateJobApplicationDto {
  @ApiProperty({
    description: 'ID công việc',
    example: 1,
  })
  job_id: number;

  @ApiProperty({
    description: 'ID ứng viên',
    example: 1,
  })
  candidate_id: number;

  @ApiProperty({
    description: 'ID CV',
    example: 1,
  })
  cv_id: number;

  @ApiProperty({
    description: 'Thư giới thiệu / ghi chú',
    example: 'Tôi rất mong muốn được làm việc tại quý công ty',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Trạng thái hồ sơ (mặc định PENDING)',
    enum: JOB_APPLICATION_STATUSES,
    example: 'PENDING',
    required: false,
  })
  status?: JobApplicationStatus;
}
