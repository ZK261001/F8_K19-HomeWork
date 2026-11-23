import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../Base/entity';

@Entity('wards')
export class Ward extends BaseEntity {
  @ApiProperty({ example: 29 })
  @Column({ type: 'int' })
  province_id: number;

  @ApiProperty({ example: 'Phường Phúc Xá' })
  @Column({ type: 'varchar', length: 255 })
  name: string;
}
