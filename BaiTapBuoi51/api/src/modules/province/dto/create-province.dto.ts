import { ApiProperty } from '@nestjs/swagger';

export class CreateProvinceDto {
  @ApiProperty({ example: 'Hà Nội', minLength: 2 })
  name: string;
}
