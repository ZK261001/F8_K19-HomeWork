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
import { CompanyAddressService } from './company_address.service';
import { CreateCompanyAddressDto } from './dto/create-company_address.dto';
import { UpdateCompanyAddressDto } from './dto/update-company_address.dto';
import { CompanyAddress } from './entities/company_address.entity';

@ApiTags('Company Address')
@Controller('company-address')
export class CompanyAddressController {
  constructor(private readonly companyAddressService: CompanyAddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create company address' })
  @ApiCreatedResponse({ type: CompanyAddress })
  create(@Body() createCompanyAddressDto: CreateCompanyAddressDto) {
    return this.companyAddressService.create(createCompanyAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of company addresses' })
  @ApiOkResponse({ type: [CompanyAddress] })
  findAll() {
    return this.companyAddressService.findAll();
  }

  @Get('columns')
  @ApiOperation({ summary: 'Get company address columns' })
  @ApiOkResponse({ type: [String] })
  getColumns() {
    return this.companyAddressService.getColumns();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company address detail' })
  @ApiOkResponse({ type: CompanyAddress })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyAddressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update company address',
    description: 'Send only the fields to change; other fields stay unchanged.',
  })
  @ApiBody({
    type: UpdateCompanyAddressDto,
    examples: { 'Update one field': { value: { address_detail: 'Số 2 Đường XYZ' } } },
  })
  @ApiOkResponse({ type: CompanyAddress })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCompanyAddressDto: UpdateCompanyAddressDto) {
    return this.companyAddressService.update(id, updateCompanyAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company address (soft delete: active = false)' })
  @ApiOkResponse({ type: CompanyAddress, description: 'Deleted record' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companyAddressService.remove(id);
  }
}
