import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../Base/entity';

export const JOB_APPLICATION_STATUSES = [
  'PENDING',
  'INTERVIEW',
  'ACCEPTED',
] as const;
export type JobApplicationStatus = (typeof JOB_APPLICATION_STATUSES)[number];

@Entity('job_applications')
export class JobApplication extends BaseEntity {
  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  job_id: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  candidate_id: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  cv_id: number;

  @ApiProperty({
    example: 'Tôi rất mong muốn được làm việc tại quý công ty',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ enum: JOB_APPLICATION_STATUSES, example: 'PENDING' })
  @Column({ type: 'enum', enum: JOB_APPLICATION_STATUSES, default: 'PENDING' })
  status: JobApplicationStatus;
}
