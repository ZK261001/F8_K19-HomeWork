import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  @ApiOperation({ summary: 'Tạo đơn ứng tuyển' })
  @ApiCreatedResponse({ type: JobApplication })
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationService.create(createJobApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách đơn ứng tuyển' })
  @ApiOkResponse({ type: [JobApplication] })
  findAll() {
    return this.jobApplicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết đơn ứng tuyển' })
  @ApiOkResponse({ type: JobApplication })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.jobApplicationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật một phần đơn ứng tuyển',
    description: 'Chỉ gửi các field cần sửa, các field khác giữ nguyên.',
  })
  @ApiBody({
    type: UpdateJobApplicationDto,
    examples: { 'Cập nhật 1 field': { value: { status: 'INTERVIEW' } } },
  })
  @ApiOkResponse({ type: JobApplication })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationService.update(+id, updateJobApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đơn ứng tuyển' })
  @ApiOkResponse({ type: JobApplication, description: 'Bản ghi đã xóa' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.jobApplicationService.remove(+id);
  }
}
