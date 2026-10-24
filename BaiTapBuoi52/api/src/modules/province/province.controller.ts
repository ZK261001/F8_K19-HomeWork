import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProvinceService } from './province.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Province, ProvinceDetail } from './entities/province.entity';

@ApiTags('Province')
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tỉnh/thành phố' })
  @ApiOkResponse({ type: [Province] })
  findAll() {
    return this.provinceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết tỉnh/thành phố kèm danh sách phường/xã' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 29,
    required: true,
    description: 'ID của thành phố',
  })
  @ApiOkResponse({ type: ProvinceDetail })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.findOne(id);
  }
}
