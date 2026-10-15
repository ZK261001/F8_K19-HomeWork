import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  private companies: Company[] = [];
  private nextId: number = 1;
  create(createCompanyDto: CreateCompanyDto) {
    const newCompany: Company = {
      ...createCompanyDto,
      id: this.nextId++,
    };
    this.companies.push(newCompany);
    return newCompany;
  }

  findAll() {
    return this.companies;
  }

  findOne(id: number) {
    const company = this.companies.find((c) => c.id === id);
    if (!company) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return company;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const index = this.companies.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Company #${id} not found`);
    }

    this.companies[index] = {
      ...this.companies[index],
      ...updateCompanyDto,
      id,
    };
    return this.companies[index];
  }

  remove(id: number) {
    const index = this.companies.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    const [removed] = this.companies.splice(index, 1);
    return removed;
  }
}
