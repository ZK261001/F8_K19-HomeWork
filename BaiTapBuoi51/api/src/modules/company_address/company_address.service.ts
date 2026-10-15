import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyAddressDto } from './dto/create-company_address.dto';
import { UpdateCompanyAddressDto } from './dto/update-company_address.dto';
import { CompanyAddress } from './entities/company_address.entity';

@Injectable()
export class CompanyAddressService {
  private companyAddresses: CompanyAddress[] = [];
  private nextId: number = 1;
  create(createCompanyAddressDto: CreateCompanyAddressDto) {
    const newCompanyAddress: CompanyAddress = {
      ...createCompanyAddressDto,
      id: this.nextId++,
    };
    this.companyAddresses.push(newCompanyAddress);
    return newCompanyAddress;
  }

  findAll() {
    return this.companyAddresses;
  }

  findOne(id: number) {
    const companyAddress = this.companyAddresses.find((c) => c.id === id);
    if (!companyAddress) {
      throw new NotFoundException(`Company address #${id} not found`);
    }
    return companyAddress;
  }

  update(id: number, updateCompanyAddressDto: UpdateCompanyAddressDto) {
    const index = this.companyAddresses.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Company address #${id} not found`);
    }

    this.companyAddresses[index] = {
      ...this.companyAddresses[index],
      ...updateCompanyAddressDto,
      id,
    };
    return this.companyAddresses[index];
  }

  remove(id: number) {
    const index = this.companyAddresses.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Company address #${id} not found`);
    }
    const [removed] = this.companyAddresses.splice(index, 1);
    return removed;
  }
}
