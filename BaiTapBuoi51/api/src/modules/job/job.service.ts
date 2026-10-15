import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  private jobs: Job[] = [];
  private nextId: number = 1;
  create(createJobDto: CreateJobDto) {
    const newJob: Job = {
      ...createJobDto,
      id: this.nextId++,
    };
    this.jobs.push(newJob);
    return newJob;
  }

  findAll() {
    return this.jobs;
  }

  findOne(id: number) {
    const job = this.jobs.find((j) => j.id === id);
    if (!job) {
      throw new NotFoundException(`Job #${id} not found`);
    }
    return job;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    const index = this.jobs.findIndex((j) => j.id === id);
    if (index === -1) {
      throw new NotFoundException(`Job #${id} not found`);
    }

    this.jobs[index] = {
      ...this.jobs[index],
      ...updateJobDto,
      id,
    };
    return this.jobs[index];
  }

  remove(id: number) {
    const index = this.jobs.findIndex((j) => j.id === id);
    if (index === -1) {
      throw new NotFoundException(`Job #${id} not found`);
    }
    const [removed] = this.jobs.splice(index, 1);
    return removed;
  }
}
