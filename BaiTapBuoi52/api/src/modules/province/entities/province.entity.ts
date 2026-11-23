import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { Ward } from '../../ward/entities/ward.entity';
import { BaseEntity } from '../../Base/entity';

@Entity('provinces')
export class Province extends BaseEntity {
  @ApiProperty({ example: 'Thành phố Hà Nội' })
  @Column({ type: 'varchar', length: 255 })
  name: string;
}

export class ProvinceDetail extends Province {
  @ApiProperty({ type: [Ward] })
  wards: Ward[];
}
