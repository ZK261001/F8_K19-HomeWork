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
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo tin tuyển dụng' })
  @ApiCreatedResponse({ type: Job })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tin tuyển dụng' })
  @ApiOkResponse({ type: [Job] })
  findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết tin tuyển dụng' })
  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật một phần tin tuyển dụng',
    description: 'Chỉ gửi các field cần sửa, các field khác giữ nguyên.',
  })
  @ApiBody({
    type: UpdateJobDto,
    examples: { 'Cập nhật 1 field': { value: { quantity: 5 } } },
  })
  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa tin tuyển dụng' })
  @ApiOkResponse({ type: Job, description: 'Bản ghi đã xóa' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
