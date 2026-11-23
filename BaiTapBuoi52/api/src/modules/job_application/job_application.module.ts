import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationService } from './job_application.service';
import { JobApplicationController } from './job_application.controller';
import { JobApplication } from './entities/job_application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication])],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
