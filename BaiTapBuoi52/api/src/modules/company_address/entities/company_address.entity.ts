import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../Base/entity';

@Entity('company_addresses')
export class CompanyAddress extends BaseEntity {
  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  company_id: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  province_id: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int' })
  ward_id: number;

  @ApiProperty({ example: 'Số 1 Đường ABC' })
  @Column({ type: 'varchar', length: 255 })
  address_detail: string;
}
