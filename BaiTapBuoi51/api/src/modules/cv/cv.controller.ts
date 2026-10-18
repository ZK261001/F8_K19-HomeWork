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
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@ApiTags('CV')
@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo CV' })
  @ApiCreatedResponse({ type: Cv })
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách CV' })
  @ApiOkResponse({ type: [Cv] })
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết CV' })
  @ApiOkResponse({ type: Cv })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật một phần CV',
    description: 'Chỉ gửi các field cần sửa, các field khác giữ nguyên.',
  })
  @ApiBody({
    type: UpdateCvDto,
    examples: { 'Cập nhật 1 field': { value: { title: 'CV Backend Developer' } } },
  })
  @ApiOkResponse({ type: Cv })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa CV' })
  @ApiOkResponse({ type: Cv, description: 'Bản ghi đã xóa' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
}
