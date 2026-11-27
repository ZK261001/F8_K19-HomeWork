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
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@ApiTags('CV')
@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @ApiOperation({ summary: 'Create CV' })
  @ApiCreatedResponse({ type: Cv })
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of CVs' })
  @ApiOkResponse({ type: [Cv] })
  findAll() {
    return this.cvService.findAll();
  }

  @Get('columns')
  @ApiOperation({ summary: 'Get CV columns' })
  @ApiOkResponse({ type: [String] })
  getColumns() {
    return this.cvService.getColumns();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get CV detail' })
  @ApiOkResponse({ type: Cv })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update CV',
    description: 'Send only the fields to change; other fields stay unchanged.',
  })
  @ApiBody({
    type: UpdateCvDto,
    examples: { 'Update one field': { value: { title: 'CV Backend Developer' } } },
  })
  @ApiOkResponse({ type: Cv })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete CV (soft delete: active = false)' })
  @ApiOkResponse({ type: Cv, description: 'Deleted record' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.remove(id);
  }
}
