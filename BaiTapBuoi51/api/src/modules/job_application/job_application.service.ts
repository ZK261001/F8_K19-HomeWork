import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job_application.dto';
import { UpdateJobApplicationDto } from './dto/update-job_application.dto';
import { JobApplication } from './entities/job_application.entity';

@Injectable()
export class JobApplicationService {
  private jobApplications: JobApplication[] = [];
  private nextId: number = 1;
  create(createJobApplicationDto: CreateJobApplicationDto) {
    const newJobApplication: JobApplication = {
      ...createJobApplicationDto,
      status: createJobApplicationDto.status ?? 'PENDING',
      id: this.nextId++,
    };
    this.jobApplications.push(newJobApplication);
    return newJobApplication;
  }

  findAll() {
    return this.jobApplications;
  }

  findOne(id: number) {
    const jobApplication = this.jobApplications.find((j) => j.id === id);
    if (!jobApplication) {
      throw new NotFoundException(`Job application #${id} not found`);
    }
    return jobApplication;
  }

  update(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    const index = this.jobApplications.findIndex((j) => j.id === id);
    if (index === -1) {
      throw new NotFoundException(`Job application #${id} not found`);
    }

    this.jobApplications[index] = {
      ...this.jobApplications[index],
      ...updateJobApplicationDto,
      id,
    };
    return this.jobApplications[index];
  }

  remove(id: number) {
    const index = this.jobApplications.findIndex((j) => j.id === id);
    if (index === -1) {
      throw new NotFoundException(`Job application #${id} not found`);
    }
    const [removed] = this.jobApplications.splice(index, 1);
    return removed;
  }
}
