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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create company' })
  @ApiCreatedResponse({ type: Company })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of companies' })
  @ApiOkResponse({ type: [Company] })
  findAll() {
    return this.companyService.findAll();
  }

  @Get('columns')
  @ApiOperation({ summary: 'Get company columns' })
  @ApiOkResponse({ type: [String] })
  getColumns() {
    return this.companyService.getColumns();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company detail' })
  @ApiOkResponse({ type: Company })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update company',
    description: 'Send only the fields to change; other fields stay unchanged.',
  })
  @ApiBody({
    type: UpdateCompanyDto,
    examples: { 'Update one field': { value: { phone: '0909999999' } } },
  })
  @ApiOkResponse({ type: Company })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company (soft delete: active = false)' })
  @ApiOkResponse({ type: Company, description: 'Deleted record' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.remove(id);
  }
}
