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
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: 'Create job' })
  @ApiCreatedResponse({ type: Job })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of jobs' })
  @ApiOkResponse({ type: [Job] })
  findAll() {
    return this.jobService.findAll();
  }

  @Get('columns')
  @ApiOperation({ summary: 'Get job columns' })
  @ApiOkResponse({ type: [String] })
  getColumns() {
    return this.jobService.getColumns();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job detail' })
  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update job',
    description: 'Send only the fields to change; other fields stay unchanged.',
  })
  @ApiBody({
    type: UpdateJobDto,
    examples: { 'Update one field': { value: { quantity: 5 } } },
  })
  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete job (soft delete: active = false)' })
  @ApiOkResponse({ type: Job, description: 'Deleted record' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.remove(id);
  }
}
