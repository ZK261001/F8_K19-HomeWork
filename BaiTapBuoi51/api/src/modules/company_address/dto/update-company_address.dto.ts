import { PartialType } from '@nestjs/swagger';
import { CreateCompanyAddressDto } from './create-company_address.dto';

export class UpdateCompanyAddressDto extends PartialType(CreateCompanyAddressDto) {}
