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
import { CompanyAddressService } from './company_address.service';
import { CreateCompanyAddressDto } from './dto/create-company_address.dto';
import { UpdateCompanyAddressDto } from './dto/update-company_address.dto';
import { CompanyAddress } from './entities/company_address.entity';

@ApiTags('Company Address')
@Controller('company-address')
export class CompanyAddressController {
  constructor(private readonly companyAddressService: CompanyAddressService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo địa chỉ công ty' })
  @ApiCreatedResponse({ type: CompanyAddress })
  create(@Body() createCompanyAddressDto: CreateCompanyAddressDto) {
    return this.companyAddressService.create(createCompanyAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách địa chỉ công ty' })
  @ApiOkResponse({ type: [CompanyAddress] })
  findAll() {
    return this.companyAddressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết địa chỉ công ty' })
  @ApiOkResponse({ type: CompanyAddress })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.companyAddressService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật một phần địa chỉ công ty',
    description: 'Chỉ gửi các field cần sửa, các field khác giữ nguyên.',
  })
  @ApiBody({
    type: UpdateCompanyAddressDto,
    examples: { 'Cập nhật 1 field': { value: { address_detail: 'Số 2 Đường XYZ' } } },
  })
  @ApiOkResponse({ type: CompanyAddress })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  update(@Param('id') id: string, @Body() updateCompanyAddressDto: UpdateCompanyAddressDto) {
    return this.companyAddressService.update(+id, updateCompanyAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa địa chỉ công ty' })
  @ApiOkResponse({ type: CompanyAddress, description: 'Bản ghi đã xóa' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy' })
  remove(@Param('id') id: string) {
    return this.companyAddressService.remove(+id);
  }
}
