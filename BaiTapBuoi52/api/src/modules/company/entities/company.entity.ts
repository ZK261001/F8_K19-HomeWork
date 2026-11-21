import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../Base/entity';

@Entity('companies')
export class Company extends BaseEntity {
  @ApiProperty({ example: '0312345678', required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  tax?: string;

  @ApiProperty({ example: 'Công ty TNHH F8' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'F8 Company Limited', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  name_eng?: string;

  @ApiProperty({ example: 'Công ty chuyên đào tạo lập trình', required: false })
  @Column({ type: 'text', nullable: true })
  desc?: string;

  @ApiProperty({ example: 'contact@f8.edu.vn' })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({ example: '0901234567', required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @ApiProperty({ example: 'https://fullstack.edu.vn', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @ApiProperty({ example: 4.5, required: false })
  @Column({ type: 'float', nullable: true })
  rate?: number;
}
