import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import {
  JOB_APPLICATION_STATUSES,
  type JobApplicationStatus,
} from '../entities/job_application.entity';

export class CreateJobApplicationDto {
  @ApiProperty({
    description: 'Job ID',
    example: 1,
  })
  @IsInt({ message: 'job_id must be an integer' })
  job_id: number;

  @ApiProperty({
    description: 'Candidate ID',
    example: 1,
  })
  @IsInt({ message: 'candidate_id must be an integer' })
  candidate_id: number;

  @ApiProperty({
    description: 'CV ID',
    example: 1,
  })
  @IsInt({ message: 'cv_id must be an integer' })
  cv_id: number;

  @ApiProperty({
    description: 'Cover letter / note',
    example: 'Tôi rất mong muốn được làm việc tại quý công ty',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Cover letter must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Application status (default PENDING)',
    enum: JOB_APPLICATION_STATUSES,
    example: 'PENDING',
    required: false,
  })
  @IsOptional()
  @IsIn(JOB_APPLICATION_STATUSES, {
    message: `Status must be one of: ${JOB_APPLICATION_STATUSES.join(', ')}`,
  })
  status?: JobApplicationStatus;
}
