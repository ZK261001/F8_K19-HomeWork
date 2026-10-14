import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  findAll() {
    return this.provinceService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    required: true,
    description: 'ID của thành phố',
  })
  findOne(@Param('id') id: string) {
    return this.provinceService.findOne(+id);
  }
}
