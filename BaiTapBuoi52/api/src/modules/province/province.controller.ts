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
  @ApiOperation({ summary: 'Get list of provinces' })
  @ApiOkResponse({ type: [Province] })
  findAll() {
    return this.provinceService.findAll();
  }

  @Get('columns')
  @ApiOperation({ summary: 'Get province columns' })
  @ApiOkResponse({ type: [String] })
  getColumns() {
    return this.provinceService.getColumns();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get province detail with its wards' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 29,
    required: true,
    description: 'Province ID',
  })
  @ApiOkResponse({ type: ProvinceDetail })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.findOne(id);
  }
}
