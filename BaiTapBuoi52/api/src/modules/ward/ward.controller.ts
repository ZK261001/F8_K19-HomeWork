import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { WardService } from './ward.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Ward } from './entities/ward.entity';

@ApiTags('Ward')
@Controller('ward')
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of wards' })
  @ApiOkResponse({ type: [Ward] })
  findAll() {
    return this.wardService.findAll();
  }

  @Get('columns')
  @ApiOperation({ summary: 'Get ward columns' })
  @ApiOkResponse({ type: [String] })
  getColumns() {
    return this.wardService.getColumns();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ward detail' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    required: true,
    description: 'Ward ID',
  })
  @ApiOkResponse({ type: Ward })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wardService.findOne(id);
  }
}
