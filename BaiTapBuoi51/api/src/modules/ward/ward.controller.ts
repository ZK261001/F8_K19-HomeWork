import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WardService } from './ward.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Ward')
@Controller('ward')
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @Get()
  findAll() {
    return this.wardService.findAll();
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
    return this.wardService.findOne(+id);
  }
}
