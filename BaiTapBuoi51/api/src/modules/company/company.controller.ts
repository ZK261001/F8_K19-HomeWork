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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo công ty' })
  @ApiCreatedResponse({ type: Company })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách công ty' })
  @ApiOkResponse({ type: [Company] })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết công ty' })
  @ApiOkResponse({ type: Company })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật một phần công ty',
    description: 'Chỉ gửi các field cần sửa, các field khác giữ nguyên.',
  })
  @ApiBody({
    type: UpdateCompanyDto,
    examples: { 'Cập nhật 1 field': { value: { phone: '0909999999' } } },
  })
  @ApiOkResponse({ type: Company })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa công ty' })
  @ApiOkResponse({ type: Company, description: 'Bản ghi đã xóa' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
