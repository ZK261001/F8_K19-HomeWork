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
  @ApiOperation({ summary: 'Create candidate' })
  @ApiCreatedResponse({ type: Candidate })
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of candidates' })
  @ApiOkResponse({ type: [Candidate] })
  findAll() {
    return this.candidateService.findAll();
  }

  @Get('columns')
  @ApiOperation({ summary: 'Get candidate columns' })
  @ApiOkResponse({ type: [String] })
  getColumns() {
    return this.candidateService.getColumns();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get candidate detail' })
  @ApiOkResponse({ type: Candidate })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.candidateService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update candidate',
    description: 'Send only the fields to change; other fields stay unchanged.',
  })
  @ApiBody({
    type: UpdateCandidateDto,
    examples: { 'Update one field': { value: { phone: '0987654321' } } },
  })
  @ApiOkResponse({ type: Candidate })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidateService.update(id, updateCandidateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete candidate (soft delete: active = false)' })
  @ApiOkResponse({ type: Candidate, description: 'Deleted record' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.candidateService.remove(id);
  }
}
