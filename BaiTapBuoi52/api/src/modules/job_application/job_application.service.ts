import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../Base/service';
import { JobApplication } from './entities/job_application.entity';

@Injectable()
export class JobApplicationService extends BaseService<JobApplication> {
  constructor(
    @InjectRepository(JobApplication)
    repository: Repository<JobApplication>,
  ) {
    super(repository);
  }
}
