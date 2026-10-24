import { ApiProperty } from '@nestjs/swagger';

export const JOB_APPLICATION_STATUSES = [
  'PENDING',
  'INTERVIEW',
  'ACCEPTED',
] as const;
export type JobApplicationStatus = (typeof JOB_APPLICATION_STATUSES)[number];

export class JobApplication {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  job_id: number;

  @ApiProperty({ example: 1 })
  candidate_id: number;

  @ApiProperty({ example: 1 })
  cv_id: number;

  @ApiProperty({
    example: 'Tôi rất mong muốn được làm việc tại quý công ty',
    required: false,
  })
  description?: string;

  @ApiProperty({ enum: JOB_APPLICATION_STATUSES, example: 'PENDING' })
  status: JobApplicationStatus;
}
