import { Controller, Get, Param } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Lấy danh sách phường/xã' })
  @ApiOkResponse({ type: [Ward] })
  findAll() {
    return this.wardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết phường/xã' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    required: true,
    description: 'ID của phường/xã',
  })
  @ApiOkResponse({ type: Ward })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.wardService.findOne(+id);
  }
}
