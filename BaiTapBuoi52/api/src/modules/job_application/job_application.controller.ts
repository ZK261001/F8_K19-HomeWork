import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JobApplicationService } from './job_application.service';
import { CreateJobApplicationDto } from './dto/create-job_application.dto';
import { UpdateJobApplicationDto } from './dto/update-job_application.dto';
import { JobApplication } from './entities/job_application.entity';

@ApiTags('Job Application')
@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create job application' })
  @ApiCreatedResponse({ type: JobApplication })
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationService.create(createJobApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of job applications' })
  @ApiOkResponse({ type: [JobApplication] })
  findAll() {
    return this.jobApplicationService.findAll();
  }

  @Get('columns')
  @ApiOperation({ summary: 'Get job application columns' })
  @ApiOkResponse({ type: [String] })
  getColumns() {
    return this.jobApplicationService.getColumns();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job application detail' })
  @ApiOkResponse({ type: JobApplication })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobApplicationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update job application',
    description: 'Send only the fields to change; other fields stay unchanged.',
  })
  @ApiBody({
    type: UpdateJobApplicationDto,
    examples: { 'Update one field': { value: { status: 'INTERVIEW' } } },
  })
  @ApiOkResponse({ type: JobApplication })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationService.update(id, updateJobApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete job application (soft delete: active = false)' })
  @ApiOkResponse({ type: JobApplication, description: 'Deleted record' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jobApplicationService.remove(id);
  }
}
