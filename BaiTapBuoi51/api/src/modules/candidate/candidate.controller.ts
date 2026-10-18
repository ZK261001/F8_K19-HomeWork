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
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';

@ApiTags('Candidate')
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo ứng viên' })
  @ApiCreatedResponse({ type: Candidate })
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách ứng viên' })
  @ApiOkResponse({ type: [Candidate] })
  findAll() {
    return this.candidateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết ứng viên' })
  @ApiOkResponse({ type: Candidate })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.candidateService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật một phần ứng viên',
    description: 'Chỉ gửi các field cần sửa, các field khác giữ nguyên.',
  })
  @ApiBody({
    type: UpdateCandidateDto,
    examples: { 'Cập nhật 1 field': { value: { phone: '0987654321' } } },
  })
  @ApiOkResponse({ type: Candidate })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCandidateDto: UpdateCandidateDto) {
    return this.candidateService.update(id, updateCandidateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa ứng viên (soft delete: active = false)' })
  @ApiOkResponse({ type: Candidate, description: 'Bản ghi đã xóa' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.candidateService.remove(id);
  }
}
